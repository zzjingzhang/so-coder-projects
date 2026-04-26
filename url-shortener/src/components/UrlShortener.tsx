import { useState } from 'react';
import { shortenUrl, isValidUrl, copyToClipboard } from '../utils/urlShortener';
import type { ShortenedUrl } from '../types';
import './UrlShortener.css';

const UrlShortener = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 重置错误状态
    setError('');
    
    // 验证 URL
    if (!urlInput.trim()) {
      setError('Please add a link');
      return;
    }
    
    if (!isValidUrl(urlInput.trim())) {
      setError('Please enter a valid URL');
      return;
    }
    
    // 调用 API
    setIsLoading(true);
    try {
      const response = await shortenUrl(urlInput.trim());
      
      if (response.ok && response.result) {
        const newShortenedUrl: ShortenedUrl = {
          id: Date.now().toString(),
          originalUrl: response.result.original_link,
          shortUrl: response.result.full_short_link,
          isCopied: false,
        };
        
        setShortenedUrls([newShortenedUrl, ...shortenedUrls]);
        setUrlInput('');
      } else {
        setError(response.error || 'Failed to shorten URL. Please try again.');
      }
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (id: string, shortUrl: string) => {
    const success = await copyToClipboard(shortUrl);
    
    if (success) {
      // 更新所有 URL 的 isCopied 状态，确保只有当前点击的按钮显示 "Copied!"
      const updatedUrls = shortenedUrls.map(url => ({
        ...url,
        isCopied: url.id === id,
      }));
      
      setShortenedUrls(updatedUrls);
      
      // 2 秒后重置状态
      setTimeout(() => {
        setShortenedUrls(prev => 
          prev.map(url => ({ ...url, isCopied: false }))
        );
      }, 2000);
    }
  };

  return (
    <section className="url-shortener">
      <div className="url-shortener-container">
        <form 
          id="url-shortener-form"
          className={`url-shortener-form ${error ? 'has-error' : ''}`} 
          onSubmit={handleSubmit}
        >
          <div className="form-input-group">
            <input
              type="text"
              placeholder="Shorten a link here..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className={`form-input ${error ? 'has-error' : ''}`}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Shortening...' : 'Shorten It!'}
          </button>
        </form>
        
        <div className="shortened-urls-list">
          {shortenedUrls.map((url) => (
            <div key={url.id} className="shortened-url-card">
              <p className="original-url">{url.originalUrl}</p>
              <div className="short-url-container">
                <a 
                  href={url.shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="short-url"
                >
                  {url.shortUrl}
                </a>
                <button
                  className={`copy-btn ${url.isCopied ? 'copied' : ''}`}
                  onClick={() => handleCopy(url.id, url.shortUrl)}
                >
                  {url.isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrlShortener;
