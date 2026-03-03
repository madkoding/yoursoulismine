async function getSouls() {
  try {
    const res = await fetch('http://localhost:3000/api/souls/all', {
      next: { revalidate: 0 }
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function Home() {
  const souls = await getSouls()

  return (
    <main className="min-h-screen bg-[#050505]">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <header className="text-center mb-20">
          <span className="decorative-skull">💀</span>
          <h1 className="dramatic-title mb-6">
            Your Soul Is Mine
          </h1>
          <p className="dramatic-subtitle">
            &quot;I need... your soul!&quot; — Shang Tsung
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <section className="lg:col-span-5 xl:col-span-4 px-6">
            <h2 className="section-title text-center">
              Claim A Soul
            </h2>
            <form action="/api/souls" method="POST" encType="multipart/form-data" className="form-container">
              <div className="corner-br"></div>
              
              <div className="space-y-8">
                <div>
                  <label className="form-label">Soul Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="form-input"
                    placeholder="Enter the soul's name..."
                  />
                </div>
                
                <div>
                  <label className="form-label">Description</label>
                  <textarea 
                    name="description" 
                    required
                    rows={4}
                    className="form-textarea"
                    placeholder="What is this soul? Who were they?"
                  />
                </div>

                <div>
                  <label className="form-label">SOUL.md File</label>
                  <input 
                    type="file" 
                    name="file" 
                    accept=".md,.txt"
                    required
                    className="form-file"
                  />
                </div>

                <button 
                  type="submit"
                  className="submit-btn"
                >
                  Steal Soul
                </button>
              </div>
            </form>
          </section>

          <section className="lg:col-span-7 xl:col-span-8 px-6">
            <h2 className="section-title text-center">
              Soul Catalog
            </h2>
            
            {souls.length === 0 ? (
              <div className="form-container">
                <div className="corner-br"></div>
              <div className="empty-state text-center">
                <p>No souls captured yet...</p>
                <p className="text-sm mt-2" style={{ color: '#6b0000' }}>Be the first to claim one!</p>
              </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {souls.map((soul: any) => (
                  <article key={soul.id} className="soul-card">
                    <h3 className="soul-name text-center">{soul.name}</h3>
                    <p className="soul-description text-center">{soul.description}</p>
                    <div className="soul-actions">
                      <a 
                        href={`/api/souls/${soul.id}`}
                        className="download-btn"
                      >
                        Download SOUL.md
                      </a>
                      <details className="soul-details">
                        <summary>View Soul File</summary>
                        <pre className="soul-content">{soul.content}</pre>
                      </details>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <footer className="mt-24 text-center">
          <p className="footer-text">— Shang Tsung&apos;s Soul Collection —</p>
        </footer>
      </div>
    </main>
  )
}
