import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { episodesData, presentationTypes, type PresentationType } from '@/data/episodesData';

export const EpisodeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const episode = episodesData.find(e => e.id === Number(id));
  
  if (!episode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <i className="pi pi-exclamation-circle text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">内容不存在</h2>
        <p className="text-gray-500 mb-6">抱歉，您访问的专栏内容不存在</p>
        <Button
          label="返回列表"
          icon="pi pi-arrow-left"
          className="bg-[#2d5a3d] hover:bg-[#1e4028] text-white"
          onClick={() => navigate('/episodes')}
        />
      </div>
    );
  }

  const currentIndex = episodesData.findIndex(e => e.id === episode.id);
  const prevEpisode = currentIndex > 0 ? episodesData[currentIndex - 1] : null;
  const nextEpisode = currentIndex < episodesData.length - 1 ? episodesData[currentIndex + 1] : null;

  const getPresentationColor = (type: PresentationType) => {
    switch (type) {
      case 'long_poster': return 'bg-blue-500';
      case 'landscape_video': return 'bg-red-500';
      case 'h5_work': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPresentationIcon = (type: PresentationType) => {
    const found = presentationTypes.find(t => t.type === type);
    return found?.icon || 'pi pi-file';
  };

  const getPresentationDesc = (type: PresentationType) => {
    const found = presentationTypes.find(t => t.type === type);
    return found?.description || '';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={episode.coverImage}
          alt={episode.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Badge 
                value={`第 ${episode.episodeNumber} 期`} 
                className={`${getPresentationColor(episode.presentationType)} text-white py-1 px-3 text-base`}
              />
              <Tag value={episode.category} className="bg-white/20 text-white border-none" />
              <Tag value={episode.city} severity="warning" />
            </div>
            <h1 className="font-serif-sc text-3xl md:text-5xl font-bold mb-3">
              {episode.title}
            </h1>
            <p className="text-xl text-white/90 mb-4">{episode.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <i className={`${getPresentationIcon(episode.presentationType)} text-[#d4a574]`}></i>
                <span className="text-white/80">{episode.presentationTypeName}</span>
              </div>
              <div className="text-white/60">|</div>
              <div className="flex items-center gap-2">
                <i className="pi pi-calendar text-[#d4a574]"></i>
                <span className="text-white/80">{episode.publishDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Button
          icon="pi pi-arrow-left"
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
          onClick={() => navigate(-1)}
          tooltip="返回"
          tooltipOptions={{ position: 'right' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Presentation Type Info */}
          <Card className="mb-8 border-l-4 border-l-[#2d5a3d]">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${getPresentationColor(episode.presentationType)}`}>
                <i className={`${getPresentationIcon(episode.presentationType)} text-white text-2xl`}></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  呈现形式：{episode.presentationTypeName}
                </h3>
                <p className="text-gray-600">{getPresentationDesc(episode.presentationType)}</p>
              </div>
            </div>
          </Card>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="font-serif-sc text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="pi pi-bookmark text-[#d4a574]"></i>
              导语
            </h2>
            <Card className="bg-gradient-to-r from-[#faf8f5] to-white">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "{episode.introduction}"
              </p>
            </Card>
          </section>

          {/* Key Points */}
          <section className="mb-10">
            <h2 className="font-serif-sc text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="pi pi-star text-[#d4a574]"></i>
              内容要点
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {episode.keyPoints.map((point, index) => (
                <Card key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2d5a3d] text-white flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{point}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Main Content */}
          <section className="mb-10">
            <h2 className="font-serif-sc text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="pi pi-file-text text-[#d4a574]"></i>
              正文内容
            </h2>
            <Card>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {episode.mainContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </section>

          {/* Related Information */}
          <Divider />
          <section className="mb-10">
            <h2 className="font-serif-sc text-2xl font-bold text-gray-800 mb-6 text-center section-title">
              相关内容
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Natural Scenery */}
              {episode.naturalScenery && episode.naturalScenery.length > 0 && (
                <Card title="自然风光" className="border-t-4 border-t-green-500">
                  <div className="flex flex-wrap gap-2">
                    {episode.naturalScenery.map((item, index) => (
                      <Tag key={index} value={item} icon="pi pi-mountain" severity="success" />
                    ))}
                  </div>
                </Card>
              )}

              {/* Foods */}
              {episode.foods && episode.foods.length > 0 && (
                <Card title="特色美食" className="border-t-4 border-t-orange-500">
                  <div className="flex flex-wrap gap-2">
                    {episode.foods.map((item, index) => (
                      <Tag key={index} value={item} icon="pi pi-shopping-cart" severity="warning" />
                    ))}
                  </div>
                </Card>
              )}

              {/* Heritage */}
              {episode.heritage && episode.heritage.length > 0 && (
                <Card title="非物质文化遗产" className="border-t-4 border-t-purple-500">
                  <div className="flex flex-wrap gap-2">
                    {episode.heritage.map((item, index) => (
                      <Tag key={index} value={item} icon="pi pi-star" severity="secondary" />
                    ))}
                  </div>
                </Card>
              )}

              {/* Buildings */}
              {episode.buildings && episode.buildings.length > 0 && (
                <Card title="古建筑" className="border-t-4 border-t-blue-500">
                  <div className="flex flex-wrap gap-2">
                    {episode.buildings.map((item, index) => (
                      <Tag key={index} value={item} icon="pi pi-building" severity="info" />
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </section>

          {/* Tags */}
          <section className="mb-10">
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <span className="text-gray-600 font-medium">相关标签：</span>
              {episode.tags.map((tag, index) => (
                <Tag key={index} value={tag} className="px-4 py-2 text-base" />
              ))}
            </div>
          </section>

          {/* Navigation */}
          <Divider />
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Previous */}
              {prevEpisode ? (
                <Card 
                  className="cursor-pointer card-hover"
                  onClick={() => navigate(`/episode/${prevEpisode.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <Button icon="pi pi-arrow-left" className="p-button-text p-button-rounded" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">上一期</p>
                      <p className="font-medium text-gray-800">{prevEpisode.title}</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <div></div>
              )}

              {/* Next */}
              {nextEpisode ? (
                <Card 
                  className="cursor-pointer card-hover text-right"
                  onClick={() => navigate(`/episode/${nextEpisode.id}`)}
                >
                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">下一期</p>
                      <p className="font-medium text-gray-800">{nextEpisode.title}</p>
                    </div>
                    <Button icon="pi pi-arrow-right" className="p-button-text p-button-rounded" />
                  </div>
                </Card>
              ) : (
                <div></div>
              )}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              label="分享给朋友"
              icon="pi pi-share-alt"
              className="bg-[#d4a574] hover:bg-[#c09060] text-white px-8 py-3"
            />
            <Button
              label="收藏"
              icon="pi pi-heart"
              className="bg-[#2d5a3d] hover:bg-[#1e4028] text-white px-8 py-3"
            />
            <Button
              label="返回列表"
              icon="pi pi-list"
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3"
              onClick={() => navigate('/episodes')}
            />
          </div>
        </div>
      </div>

      {/* More Episodes */}
      <div className="bg-white py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif-sc text-2xl font-bold text-gray-800 text-center mb-8 section-title">
            更多精彩内容
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {episodesData
              .filter(e => e.id !== episode.id)
              .slice(0, 3)
              .map((item) => (
                <Card
                  key={item.id}
                  className="card-hover cursor-pointer"
                  onClick={() => navigate(`/episode/${item.id}`)}
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-t-lg -mt-5 -mx-5 mb-4"
                    style={{ width: 'calc(100% + 2.5rem)' }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <Badge value={`第${item.episodeNumber}期`} className="bg-[#2d5a3d] text-white" />
                    <Tag value={item.presentationTypeName} className="text-xs" />
                  </div>
                  <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-1 mt-1">{item.subtitle}</p>
                </Card>
              ))}
          </div>
          <div className="text-center mt-8">
            <Button
              label="查看全部内容"
              icon="pi pi-arrow-right"
              className="bg-[#2d5a3d] hover:bg-[#1e4028] text-white"
              onClick={() => navigate('/episodes')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
