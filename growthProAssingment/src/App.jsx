// frontend/src/App.jsx
import { useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/business-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location })
      });
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    if (!name || !location) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/regenerate-headline?name=${encodeURIComponent(
          name
        )}&location=${encodeURIComponent(location)}`
      );
      const { headline } = await res.json();
      setData(prev => ({ ...prev, headline }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Local Business Dashboard
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Business Name"
              className="w-full p-3 border rounded-lg"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-3 border rounded-lg"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? 'Loading...' : 'Get Business Data'}
            </button>
          </div>
        </form>

        {/* Display Card */}
        {data && (
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Google Rating:</span>{' '}
              {data.rating}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Reviews:</span> {data.reviews}
            </p>
            <p className="text-lg italic">"{data.headline}"</p>
            <button
              onClick={regenerateHeadline}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {loading ? 'Loading...' : 'Regenerate SEO Headline'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
