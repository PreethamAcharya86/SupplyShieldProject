import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, CheckCircle, BookOpen, PenLine } from 'lucide-react';

const MOCK_REVIEWS = [
  { id: 1, user: 'Arjun S.', region: 'South Asia', rating: 5, comment: 'Major flooding has disrupted rice transport routes. Local markets are reporting 40% shortages.', date: '2h ago', type: 'Crisis' },
  { id: 2, user: 'Priya K.', region: 'East Africa', rating: 4, comment: 'Drought conditions worsening. Maize prices up 60% this week. Community kitchens running low on reserves.', date: '5h ago', type: 'News' },
  { id: 3, user: 'Rahul M.', region: 'South America', rating: 3, comment: 'Port strike entering day 14. Container shipping severely impacted. Fuel prices skyrocketing.', date: '1d ago', type: 'Crisis' },
  { id: 4, user: 'Sofia L.', region: 'Eastern Europe', rating: 4, comment: 'Wheat corridor reopening. Supply expected to normalize within 2 weeks per local sources.', date: '2d ago', type: 'News' },
];

const Locality = () => {
  const [mode, setMode] = useState<null | 'read' | 'write'>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ region: '', type: 'Crisis', comment: '' });

  const handleSubmit = () => {
    if (!form.region || !form.comment) return;
    setSubmitted(true);
    setMode(null);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 180px)',
        background: 'radial-gradient(ellipse at 50% 50%, #0a1628 0%, #030712 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 1 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
          🌍 Locality Intelligence
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Click the globe to read or submit a local crisis report.</p>
      </motion.div>

      {/* Globe */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        onClick={() => { if (!mode) setMode('read'); }}
        animate={submitted ? { boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 80px rgba(16,185,129,0.9)', '0 0 0px rgba(16,185,129,0)'] } : {}}
        transition={{ duration: 1.5 }}
        style={{
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid rgba(59,130,246,0.3)',
          boxShadow: '0 0 60px rgba(59,130,246,0.25), inset -40px -30px 80px rgba(0,0,0,0.7), inset 20px 20px 40px rgba(255,255,255,0.05)',
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Earth_map_light.jpg/1280px-Earth_map_light.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
          zIndex: 1,
        }}
      >
        {/* Animate background position for rotation */}
        <motion.div
          style={{ position: 'absolute', inset: 0, backgroundImage: 'inherit', backgroundSize: 'cover', backgroundRepeat: 'repeat-x' }}
          animate={{ backgroundPositionX: ['0%', '200%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* Shading overlay for 3D sphere effect */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.7) 0%, transparent 60%)'
        }} />

        {/* Blue atmosphere tint */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(59,130,246,0.08)', mixBlendMode: 'overlay', pointerEvents: 'none' }} />

        {/* Submitted Overlay */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.85)',
                borderRadius: '50%', zIndex: 10, gap: '0.5rem'
              }}
            >
              <CheckCircle size={56} color="white" />
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Review Submitted!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click hint when idle */}
        {!submitted && (
          <div style={{
            position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', textShadow: '0 1px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap'
          }}>
            ← Click to Explore →
          </div>
        )}
      </motion.div>

      {/* Live ping dots around globe */}
      {[
        { angle: 30, label: 'EU' }, { angle: 120, label: 'ASIA' },
        { angle: 200, label: 'USA' }, { angle: 290, label: 'AFR' },
      ].map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const r = 210;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            style={{
              position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2,
            }}
          >
            <div style={{ position: 'relative', width: '14px', height: '14px' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#3b82f6', borderRadius: '50%', opacity: 0.4, animation: 'ping 1.5s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', inset: '2px', background: '#3b82f6', borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: '0.55rem', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>{node.label}</span>
          </motion.div>
        );
      })}

      {/* Action Panel */}
      <AnimatePresence mode="wait">
        {mode === 'read' && (
          <motion.div
            key="read"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setMode(null); }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{
                background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1.5rem', padding: '2rem', maxWidth: '640px', width: '90%',
                maxHeight: '80vh', overflowY: 'auto', position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={20} color="#3b82f6" /> Community Field Reports
                </h2>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setMode('write')}
                    style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '0.5rem', color: 'white', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <PenLine size={14} /> Write Review
                  </button>
                  <button onClick={() => setMode(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem' }}>
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem', borderLeft: `4px solid ${review.type === 'Crisis' ? '#ef4444' : '#f59e0b'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '32px', height: '32px', background: 'rgba(59,130,246,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                          {review.user[0]}
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{review.user}</p>
                          <p style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{review.region}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', borderRadius: '999px', background: review.type === 'Crisis' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)', color: review.type === 'Crisis' ? '#ef4444' : '#f59e0b', fontWeight: 700 }}>{review.type}</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{review.date}</span>
                      </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: 1.6 }}>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {mode === 'write' && (
          <motion.div
            key="write"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setMode(null); }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '90%', position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PenLine size={20} color="#3b82f6" /> Submit Field Report
                </h2>
                <button onClick={() => setMode(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem' }}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>Your Region *</label>
                  <input
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                    placeholder="e.g. Maharashtra, India"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>Report Type</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Crisis', 'News', 'Update'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, type: t })}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: `1px solid ${form.type === t ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`, background: form.type === t ? 'rgba(59,130,246,0.2)' : 'transparent', color: form.type === t ? '#3b82f6' : '#94a3b8', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>Report Details *</label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Describe the local crisis or news affecting supply chains..."
                    rows={4}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setMode('read')}
                    style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{ flex: 2, padding: '0.75rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '0.75rem', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    🌍 Submit Report
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '2.5rem', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem 2.5rem', display: 'flex', gap: '2.5rem', backdropFilter: 'blur(16px)', zIndex: 1 }}
      >
        {[
          { label: 'Active Nodes', value: '12,482', color: '#3b82f6' },
          { label: 'Reports Today', value: '847', color: '#f59e0b' },
          { label: 'Crisis Alerts', value: '23', color: '#ef4444' },
          { label: 'Agents Online', value: '2,481', color: '#10b981' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{stat.label}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Locality;
