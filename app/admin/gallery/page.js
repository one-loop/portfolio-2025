'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

export default function GalleryManager() {
  const [allImages, setAllImages] = useState([]);
  const [removedFilenames, setRemovedFilenames] = useState(new Set());
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterSeason, setFilterSeason] = useState('all');
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.images) {
        setAllImages(data.images);
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to load gallery images: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const locations = useMemo(() => {
    const set = new Set();
    allImages.forEach(img => {
      if (img.location) set.add(img.location);
    });
    return Array.from(set).sort();
  }, [allImages]);

  const seasons = useMemo(() => {
    const set = new Set();
    allImages.forEach(img => {
      if (img.season) set.add(img.season);
    });
    return Array.from(set).sort();
  }, [allImages]);

  const toggleRemove = (filename) => {
    setRemovedFilenames(prev => {
      const next = new Set(prev);
      if (next.has(filename)) {
        next.delete(filename);
      } else {
        next.add(filename);
      }
      return next;
    });
  };

  const filteredImages = useMemo(() => {
    return allImages.filter(img => {
      const matchesSearch = !search || 
        (img.filename && img.filename.toLowerCase().includes(search.toLowerCase())) ||
        (img.location && img.location.toLowerCase().includes(search.toLowerCase())) ||
        (img.season && img.season.toLowerCase().includes(search.toLowerCase()));
      const matchesLocation = filterLocation === 'all' || img.location === filterLocation;
      const matchesSeason = filterSeason === 'all' || img.season === filterSeason;
      return matchesSearch && matchesLocation && matchesSeason;
    });
  }, [allImages, search, filterLocation, filterSeason]);

  const remainingCount = allImages.length - removedFilenames.size;

  const handleSave = async () => {
    if (!confirm('Save changes? ' + removedFilenames.size + ' image(s) will be removed from the gallery. (Original is backed up in gallery.backup.json)')) {
      return;
    }
    try {
      setSaving(true);
      setStatusMessage({ type: 'info', text: 'Saving changes...' });
      const updatedList = allImages.filter(img => !removedFilenames.has(img.filename));
      const res = await fetch('/api/gallery', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', images: updatedList })});
      const data = await res.json();
      if (data.success) {
        setAllImages(updatedList);
        setRemovedFilenames(new Set());
        setStatusMessage({ type: 'success', text: data.message });
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Save failed: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleRestore = async () => {
    if (!confirm('Are you sure you want to restore all images from the original backup (gallery.backup.json)?')) {
      return;
    }
    try {
      setSaving(true);
      setStatusMessage({ type: 'info', text: 'Restoring from backup...' });
      const res = await fetch('/api/gallery', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'restore' })});
      const data = await res.json();
      if (data.success) {
        setAllImages(data.images);
        setRemovedFilenames(new Set());
        setStatusMessage({ type: 'success', text: data.message });
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to restore' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Restore failed: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadCopy = () => {
    const updatedList = allImages.filter(img => !removedFilenames.has(img.filename));
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(updatedList, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'gallery.cleaned.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1117', color: '#f2f2f2', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', padding: '32px 24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'sticky', top: '16px', zIndex: 100, backgroundColor: 'rgba(20, 24, 33, 0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', padding: '18px 24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>Gallery Debug & Curator Tool</h1>
            <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 500 }}>Safe Backup Active</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Click any image to mark for removal. Changes only apply when you click <b>Save to Website</b>.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '13px', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            Total: <b>{allImages.length}</b> | Keeping: <b style={{ color: '#4ade80' }}>{remainingCount}</b> | Marked to Remove: <b style={{ color: '#f87171' }}>{removedFilenames.size}</b>
          </div>
          <Link href='/photos' target='_blank' style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#f2f2f2', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>View Live Gallery ↗</Link>
          <button onClick={handleDownloadCopy} style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#f2f2f2', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Export Clean JSON</button>
          <button onClick={handleRestore} disabled={saving} style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 14px', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 500 }}>Restore Backup</button>
          <button onClick={handleSave} disabled={saving || removedFilenames.size === 0} style={{ backgroundColor: removedFilenames.size > 0 ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)', color: removedFilenames.size > 0 ? '#0f172a' : '#64748b', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: (saving || removedFilenames.size === 0) ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 600, boxShadow: removedFilenames.size > 0 ? '0 0 16px rgba(56, 189, 248, 0.4)' : 'none', transition: 'all 0.2s ease' }}>{saving ? 'Saving...' : 'Save to Website (' + removedFilenames.size + ' Removed)'}</button>
        </div>
      </div>

      <div style={{ maxWidth: '1600px', margin: '20px auto 0 auto', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <input type='text' placeholder='Search filename, location, season...' value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, minWidth: '240px', backgroundColor: 'rgba(20, 24, 33, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#f2f2f2', padding: '10px 14px', fontSize: '14px', outline: 'none' }} />
        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} style={{ backgroundColor: 'rgba(20, 24, 33, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#f2f2f2', padding: '10px 14px', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
          <option value='all'>All Locations ({locations.length})</option>
          {locations.map(loc => (<option key={loc} value={loc}>{loc}</option>))}
        </select>
        <select value={filterSeason} onChange={(e) => setFilterSeason(e.target.value)} style={{ backgroundColor: 'rgba(20, 24, 33, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#f2f2f2', padding: '10px 14px', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
          <option value='all'>All Seasons ({seasons.length})</option>
          {seasons.map(s => (<option key={s} value={s}>{s}</option>))}
        </select>
        {removedFilenames.size > 0 && (
          <button onClick={() => setRemovedFilenames(new Set())} style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Clear Selected ({removedFilenames.size})</button>
        )}
      </div>

      {statusMessage.text && (
        <div style={{ maxWidth: '1600px', margin: '16px auto', padding: '12px 18px', borderRadius: '8px', backgroundColor: statusMessage.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', border: '1px solid ' + (statusMessage.type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'), color: statusMessage.type === 'error' ? '#fca5a5' : '#86efac', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage({ type: '', text: '' })} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>
      )}

      <div style={{ maxWidth: '1600px', margin: '24px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading gallery dataset...</div>
        ) : filteredImages.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#94a3b8' }}>No images match current search/filter.</div>
        ) : (
          filteredImages.map((img, idx) => {
            const isRemoved = removedFilenames.has(img.filename);
            return (
              <div key={img.filename || idx} onClick={() => toggleRemove(img.filename)} style={{ position: 'relative', backgroundColor: 'rgba(20, 24, 33, 0.8)', border: isRemoved ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', opacity: isRemoved ? 0.35 : 1, boxShadow: isRemoved ? '0 0 12px rgba(239, 68, 68, 0.3)' : '0 2px 8px rgba(0,0,0,0.2)', transition: 'all 0.15s ease' }}>
                <div style={{ position: 'relative', width: '100%', height: '260px', backgroundColor: '#000' }}>
                  <img src={'/gallery/' + img.filename} alt={img.filename} loading='lazy' style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: isRemoved ? '#ef4444' : 'rgba(0, 0, 0, 0.6)', color: '#fff', borderRadius: '999px', padding: '4px 10px', fontSize: '11px', fontWeight: 600, backdropFilter: 'blur(8px)' }}>{isRemoved ? '✕ REMOVE' : '✓ KEEP'}</div>
                  <button onClick={(e) => { e.stopPropagation(); setPreviewImage(img); }} style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', backdropFilter: 'blur(8px)' }} title='Preview Full Image'>🔍 Zoom</button>
                </div>
                <div style={{ padding: '12px', fontSize: '12px', color: '#94a3b8' }}>
                  <div style={{ color: '#f2f2f2', fontWeight: 500, marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{img.filename}</span>
                    <span style={{ color: isRemoved ? '#ef4444' : '#4ade80' }}>{isRemoved ? 'Marked to Remove' : 'Active'}</span>
                  </div>
                  {img.location && <div>📍 {img.location}</div>}
                  {img.season && <div>🗓️ {img.season}</div>}
                </div>
              </div>
            );
          })
        )}
      </div>

      {previewImage && (
        <div onClick={() => setPreviewImage(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'zoom-out' }}>
          <div style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <img src={'/gallery/' + previewImage.filename} alt={previewImage.filename} style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }} />
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <b style={{ fontSize: '16px' }}>{previewImage.filename}</b>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>{previewImage.location} • {previewImage.season}</div>
              </div>
              <button onClick={() => { toggleRemove(previewImage.filename); setPreviewImage(null); }} style={{ backgroundColor: removedFilenames.has(previewImage.filename) ? '#4ade80' : '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>{removedFilenames.has(previewImage.filename) ? 'Undo Removal (Keep)' : 'Mark for Removal'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}