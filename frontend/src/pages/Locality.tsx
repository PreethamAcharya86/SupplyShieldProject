import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PenLine, BookOpen, CheckCircle, Send } from 'lucide-react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const MOCK_REVIEWS = [
  { id: 1, user: 'Arjun S.', region: 'South Asia', comment: 'Major flooding disrupted rice transport. 40% shortage reported.', date: '2h ago', type: 'Crisis' },
  { id: 2, user: 'Priya K.', region: 'East Africa', comment: 'Drought worsening. Maize prices up 60% this week.', date: '5h ago', type: 'News' },
  { id: 3, user: 'Rahul M.', region: 'South America', comment: 'Port strike day 14. Fuel prices skyrocketing.', date: '1d ago', type: 'Crisis' },
  { id: 4, user: 'Sofia L.', region: 'Eastern Europe', comment: 'Wheat corridor reopening. Supply normalizing soon.', date: '2d ago', type: 'News' },
];

export default function Locality() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mode, setMode] = useState<null | 'read' | 'write'>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ region: '', type: 'Crisis', comment: '' });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);
  const rotationRef = useRef([0, -20, 0]);
  const isDragging = useRef(false);
  const dragStart = useRef<[number, number]>([0, 0]);
  const projRef = useRef<d3.GeoProjection | null>(null);
  const animFrameRef = useRef<number>(0);
  const autoRotate = useRef(true);

  const draw = useCallback((world: any) => {
    const svg = d3.select(svgRef.current);
    const W = 500, H = 500;
    const proj = d3.geoOrthographic()
      .scale(220)
      .translate([W / 2, H / 2])
      .clipAngle(90)
      .rotate(rotationRef.current as [number, number, number]);
    projRef.current = proj;
    const path = d3.geoPath().projection(proj);
    const sphere: d3.GeoPermissibleObjects = { type: 'Sphere' };

    svg.select('.globe-sphere').attr('d', path(sphere) || '');
    svg.select('.graticule').attr('d', path(d3.geoGraticule()()) || '');
    svg.selectAll('.country').attr('d', (d: any) => path(d) || '');
  }, []);

  useEffect(() => {
    const W = 500, H = 500;
    const svg = d3.select(svgRef.current).attr('viewBox', `0 0 ${W} ${H}`);
    svg.selectAll('*').remove();

    // Defs for gradient
    const defs = svg.append('defs');
    const grad = defs.append('radialGradient').attr('id', 'ocean-grad').attr('cx', '40%').attr('cy', '35%');
    grad.append('stop').attr('offset', '0%').attr('stop-color', '#1e3a5f');
    grad.append('stop').attr('offset', '100%').attr('stop-color', '#060d1a');

    const atmoGrad = defs.append('radialGradient').attr('id', 'atmo-grad').attr('cx', '40%').attr('cy', '35%');
    atmoGrad.append('stop').attr('offset', '70%').attr('stop-color', '#3b82f6').attr('stop-opacity', '0');
    atmoGrad.append('stop').attr('offset', '100%').attr('stop-color', '#3b82f6').attr('stop-opacity', '0.35');

    const shineDefs = defs.append('radialGradient').attr('id', 'shine').attr('cx', '35%').attr('cy', '30%');
    shineDefs.append('stop').attr('offset', '0%').attr('stop-color', '#ffffff').attr('stop-opacity', '0.12');
    shineDefs.append('stop').attr('offset', '100%').attr('stop-color', '#ffffff').attr('stop-opacity', '0');

    const clip = defs.append('clipPath').attr('id', 'globe-clip');
    clip.append('circle').attr('cx', W / 2).attr('cy', H / 2).attr('r', 220);

    // Atmosphere glow
    svg.append('circle').attr('cx', W / 2).attr('cy', H / 2).attr('r', 235)
      .attr('fill', 'none').attr('stroke', '#3b82f6').attr('stroke-width', '14').attr('stroke-opacity', '0.15');
    svg.append('circle').attr('cx', W / 2).attr('cy', H / 2).attr('r', 228)
      .attr('fill', 'url(#atmo-grad)');

    const g = svg.append('g').attr('clip-path', 'url(#globe-clip)');
    g.append('path').attr('class', 'globe-sphere').attr('fill', 'url(#ocean-grad)');
    g.append('path').attr('class', 'graticule').attr('fill', 'none').attr('stroke', '#1e40af').attr('stroke-width', '0.3').attr('opacity', '0.5');

    // Shine overlay
    svg.append('circle').attr('cx', W / 2).attr('cy', H / 2).attr('r', 220).attr('fill', 'url(#shine)').style('pointer-events', 'none');

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then((world) => {
        const countries = (topojson.feature(world, world.objects.countries) as any).features;
        g.selectAll('.country')
          .data(countries)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('fill', '#22c55e')
          .attr('fill-opacity', '0.55')
          .attr('stroke', '#16a34a')
          .attr('stroke-width', '0.4')
          .style('cursor', 'pointer')
          .on('mousemove', (event, d: any) => {
            const name = d.properties?.name || 'Unknown';
            setTooltip({ x: event.clientX, y: event.clientY, name });
          })
          .on('mouseleave', () => setTooltip(null))
          .on('click', () => { autoRotate.current = false; setMode('read'); });

        draw(world);

        // Auto-rotate loop
        const rotate = () => {
          if (autoRotate.current) {
            rotationRef.current[0] += 0.2;
            draw(world);
          }
          animFrameRef.current = requestAnimationFrame(rotate);
        };
        animFrameRef.current = requestAnimationFrame(rotate);
      });

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  // Drag to rotate
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    autoRotate.current = false;
    dragStart.current = [e.clientX, e.clientY];
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current[0];
    const dy = e.clientY - dragStart.current[1];
    rotationRef.current[0] += dx * 0.4;
    rotationRef.current[1] -= dy * 0.4;
    dragStart.current = [e.clientX, e.clientY];
    if (projRef.current) {
      projRef.current.rotate(rotationRef.current as [number, number, number]);
      const path = d3.geoPath().projection(projRef.current);
      const svg = d3.select(svgRef.current);
      svg.select('.globe-sphere').attr('d', path({ type: 'Sphere' }) || '');
      svg.select('.graticule').attr('d', path(d3.geoGraticule()()) || '');
      svg.selectAll('.country').attr('d', (d: any) => path(d) || '');
    }
  };
  const onMouseUp = () => { isDragging.current = false; };

  const handleSubmit = () => {
    if (!form.region || !form.comment) return;
    setSubmitted(true);
    setMode(null);
    setForm({ region: '', type: 'Crisis', comment: '' });
    setTimeout(() => { setSubmitted(false); autoRotate.current = true; }, 4000);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 180px)', background: 'radial-gradient(ellipse at 50% 40%, #0a1628 0%, #030712 80%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem', textAlign: 'center' }}>
        🌍 Locality Intelligence
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: '#64748b', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
        Drag to rotate • Click any country to submit or read a field report
      </motion.p>

      {/* Globe */}
      <div style={{ position: 'relative', cursor: isDragging.current ? 'grabbing' : 'grab' }}>
        <svg ref={svgRef} width={500} height={500} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} style={{ display: 'block', filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.35))' }} />

        {/* Submitted flash */}
        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.85)', borderRadius: '50%', gap: '0.5rem' }}>
              <CheckCircle size={60} color="white" />
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Report Submitted!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resume auto-rotate button */}
        {!autoRotate.current && !mode && (
          <button onClick={() => { autoRotate.current = true; }} style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', padding: '0.3rem 0.9rem', fontSize: '0.75rem', background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '999px', color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}>
            ▶ Resume Rotation
          </button>
        )}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div style={{ position: 'fixed', left: tooltip.x + 12, top: tooltip.y - 30, background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.3rem 0.75rem', fontSize: '0.8rem', color: 'white', fontWeight: 600, pointerEvents: 'none', zIndex: 999 }}>
          {tooltip.name}
        </div>
      )}

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1rem 2rem', backdropFilter: 'blur(16px)' }}>
        {[{ l: 'Active Nodes', v: '12,482', c: '#3b82f6' }, { l: 'Reports Today', v: '847', c: '#f59e0b' }, { l: 'Crisis Alerts', v: '23', c: '#ef4444' }, { l: 'Agents Online', v: '2,481', c: '#10b981' }].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: s.c }}>{s.v}</p>
          </div>
        ))}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {mode === 'read' && (
          <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setMode(null); }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '640px', width: '92%', maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={20} color="#3b82f6" /> Community Reports</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setMode('write')} style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: 'none', borderRadius: '0.5rem', color: 'white', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><PenLine size={14} /> Write</button>
                  <button onClick={() => setMode(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem' }}><X size={18} /></button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {MOCK_REVIEWS.map(r => (
                  <div key={r.id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '1rem', padding: '1rem', borderLeft: `4px solid ${r.type === 'Crisis' ? '#ef4444' : '#f59e0b'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.user} · <span style={{ color: '#64748b', fontWeight: 400 }}>{r.region}</span></span>
                      <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '999px', background: r.type === 'Crisis' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)', color: r.type === 'Crisis' ? '#ef4444' : '#f59e0b', fontWeight: 700 }}>{r.type}</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.6 }}>"{r.comment}"</p>
                    <p style={{ color: '#475569', fontSize: '0.7rem', marginTop: '0.4rem' }}>{r.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {mode === 'write' && (
          <motion.div key="write" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setMode(null); }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '480px', width: '92%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><PenLine size={20} color="#3b82f6" /> Submit Field Report</h2>
                <button onClick={() => setMode(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem' }}><X size={18} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>Your Region *</label>
                  <input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} placeholder="e.g. Karnataka, India" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>Report Type</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Crisis', 'News', 'Update'].map(t => (
                      <button key={t} onClick={() => setForm({ ...form, type: t })} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: `1px solid ${form.type === t ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`, background: form.type === t ? 'rgba(59,130,246,0.2)' : 'transparent', color: form.type === t ? '#3b82f6' : '#94a3b8', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>Report Details *</label>
                  <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} placeholder="Describe the local crisis or supply chain issue..." rows={4} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setMode('read')} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer' }}>Back</button>
                  <button onClick={handleSubmit} style={{ flex: 2, padding: '0.75rem', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: 'none', borderRadius: '0.75rem', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Send size={16} /> Submit Report</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
