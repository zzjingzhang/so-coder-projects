import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { useNavigate } from 'react-router-dom';
import { episodesData, presentationTypes, type PresentationType } from '@/data/episodesData';
import { naturalScenery, specialFoods, intangibleHeritage, ancientBuildings } from '@/data/jiangxiData';

export const HomePage = () => {
  const navigate = useNavigate();
  
  const heroEpisode = episodesData[0];
  const longPosterEpisodes = episodesData.filter(e => e.presentationType === 'long_poster').slice(0, 3);
  const landscapeVideoEpisodes = episodesData.filter(e => e.presentationType === 'landscape_video').slice(0, 3);
  const h5WorkEpisodes = episodesData.filter(e => e.presentationType === 'h5_work').slice(0, 3);

  const getPresentationColor = (type: PresentationType) => {
    switch (type) {
      case 'long_poster': return 'bg-blue-500';
      case 'landscape_video': return 'bg-red-500';
      case 'h5_work': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const renderEpisodeCard = (episode: typeof episodesData[0]) => (
    <div
      key={episode.id}
      className="card-hover cursor-pointer h-full bg-white rounded-xl shadow-md overflow-hidden"
      onClick={() => navigate(`/episode/${episode.id}`)}
    >
      <div className="relative">
        <img
          src={episode.coverImage}
          alt={episode.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            value={`第${episode.episodeNumber}期`} 
            className={`${getPresentationColor(episode.presentationType)} text-white py-1 px-2`}
          />
        </div>
        <div className="absolute top-3 right-3">
          <Tag value={episode.presentationTypeName} className="bg-white/90 text-gray-700" />
        </div>
      </div>
      <div className="p-5">
        <div className="font-serif-sc text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {episode.title}
        </div>
        <div className="text-sm text-gray-500 mb-4 line-clamp-2">
          {episode.subtitle}
        </div>
        <div className="flex flex-wrap gap-2">
          {episode.tags.slice(0, 3).map((tag, i) => (
            <Tag key={i} value={tag} severity="info" className="text-xs" />
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection = (
    title: string,
    subtitle: string,
    icon: string,
    episodes: typeof episodesData,
    type: PresentationType,
    bgClass: string = ''
  ) => (
    <section className={`py-20 px-4 ${bgClass}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <i className={`${icon} text-3xl text-[#2d5a3d]`}></i>
            <h2 className="font-serif-sc text-3xl font-bold text-gray-800 section-title">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {episodes.map((episode) => renderEpisodeCard(episode))}
        </div>
        
        <div className="text-center">
          <Button
            label="查看全部"
            icon="pi pi-arrow-right"
            className="bg-[#2d5a3d] hover:bg-[#1e4028] text-white px-8 py-3"
            onClick={() => navigate(`/episodes?type=${type}`)}
          />
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroEpisode.coverImage}
            alt="小兔子江西游记"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <div className="text-6xl mb-6 animate-bounce">🐰</div>
          <h1 className="font-serif-sc text-4xl md:text-6xl font-bold mb-4 text-shadow">
            小兔子江西游记
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-white/90">
            物华天宝 · 人杰地灵
          </p>
          <p className="text-lg mb-8 text-white/80 max-w-2xl">
            跟随小兔子的脚步，探索江西的山水湖林、特色美食、非物质文化遗产和古建筑
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              label="开始探索"
              icon="pi pi-compass"
              className="bg-[#d4a574] hover:bg-[#c09060] text-white text-lg px-8 py-3 border-none shadow-lg"
              onClick={() => navigate('/episodes')}
            />
            <Button
              label="了解更多"
              icon="pi pi-info-circle"
              className="bg-white/20 hover:bg-white/30 text-white text-lg px-8 py-3 border-none backdrop-blur-sm"
              onClick={() => navigate(`/episode/${heroEpisode.id}`)}
            />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="pi pi-chevron-down text-white/70 text-2xl"></i>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#2d5a3d] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">{episodesData.length}</div>
              <div className="text-white/80">精彩内容</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">11</div>
              <div className="text-white/80">设区市</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{presentationTypes.length}</div>
              <div className="text-white/80">呈现形式</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-white/80">精彩无限</div>
            </div>
          </div>
        </div>
      </section>

      {/* Presentation Types Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-sc text-3xl font-bold text-gray-800 section-title mb-4">
              多元呈现形式
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们采用长图海报、横屏视频、H5互动等多种形式，全方位展现江西之美
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {presentationTypes.map((type, index) => (
              <div
                key={index}
                className="card-hover text-center cursor-pointer bg-white rounded-xl shadow-md p-8"
                onClick={() => navigate(`/episodes?type=${type.type}`)}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  type.type === 'long_poster' ? 'bg-blue-100' :
                  type.type === 'landscape_video' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <i className={`${type.icon} text-3xl ${
                    type.type === 'long_poster' ? 'text-blue-600' :
                    type.type === 'landscape_video' ? 'text-red-600' : 'text-green-600'
                  }`}></i>
                </div>
                <h3 className="font-serif-sc text-xl font-semibold mb-3">{type.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <Tag 
                  value={`${episodesData.filter(e => e.presentationType === type.type).length}期内容`}
                  severity="secondary"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long Poster Section */}
      {renderSection(
        '长图海报',
        '精美长图设计，竖屏浏览，适合微信朋友圈分享，图文并茂展现江西之美',
        'pi pi-image',
        longPosterEpisodes,
        'long_poster',
        ''
      )}

      {/* Landscape Video Section */}
      {renderSection(
        '横屏视频',
        '4K超清视频，电影级画面，身临其境感受江西的自然风光与人文魅力',
        'pi pi-play-circle',
        landscapeVideoEpisodes,
        'landscape_video',
        'bg-gray-50'
      )}

      {/* H5 Works Section */}
      {renderSection(
        'H5互动作品',
        '交互式H5页面，可滑动、可点击，沉浸式体验江西文化的独特魅力',
        'pi pi-mobile',
        h5WorkEpisodes,
        'h5_work',
        ''
      )}

      {/* Jiangxi Overview Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#2d5a3d] to-[#4a7c59] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif-sc text-3xl font-bold mb-4">
              江西文化概览
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              山水湖林、特色美食、非物质文化遗产、古建筑，江西的文化瑰宝等待您来探索
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <i className="pi pi-mountain text-4xl text-[#d4a574] mb-4"></i>
              <h3 className="font-serif-sc text-xl font-semibold mb-4">自然风光</h3>
              <div className="space-y-3 text-sm text-white/90">
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{naturalScenery.mountains.length}座名山</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{naturalScenery.waters.length}处秀水</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{naturalScenery.forests.length}片林海</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <i className="pi pi-shopping-cart text-4xl text-[#d4a574] mb-4"></i>
              <h3 className="font-serif-sc text-xl font-semibold mb-4">特色美食</h3>
              <div className="space-y-3 text-sm text-white/90">
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{specialFoods.length}个设区市</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{specialFoods.reduce((sum, city) => sum + city.items.length, 0)}+道美食</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>独具地方特色</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <i className="pi pi-star text-4xl text-[#d4a574] mb-4"></i>
              <h3 className="font-serif-sc text-xl font-semibold mb-4">非物质文化遗产</h3>
              <div className="space-y-3 text-sm text-white/90">
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{intangibleHeritage.length}个设区市</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{intangibleHeritage.reduce((sum, city) => sum + city.items.length, 0)}+项非遗</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>千年传承</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <i className="pi pi-building text-4xl text-[#d4a574] mb-4"></i>
              <h3 className="font-serif-sc text-xl font-semibold mb-4">古建筑</h3>
              <div className="space-y-3 text-sm text-white/90">
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{ancientBuildings.length}个设区市</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>{ancientBuildings.reduce((sum, city) => sum + city.items.length, 0)}+处古迹</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-check-circle text-green-300"></i>
                  <span>历史悠久</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-[#d4a574] to-[#e8c9a8]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif-sc text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            准备好开启江西之旅了吗？
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            跟随小兔子的脚步，一起探索这片物华天宝、人杰地灵的土地
          </p>
          <Button
            label="立即开始探索"
            icon="pi pi-compass"
            className="bg-[#2d5a3d] hover:bg-[#1e4028] text-white text-lg px-10 py-4 shadow-lg"
            onClick={() => navigate('/episodes')}
          />
        </div>
      </section>
    </div>
  );
};
