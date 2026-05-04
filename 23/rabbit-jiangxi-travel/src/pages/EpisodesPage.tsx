import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
import { episodesData, presentationTypes, type PresentationType } from '@/data/episodesData';
import type { EpisodeContent } from '@/data/episodesData';

export const EpisodesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<PresentationType | 'all'>('all');
  const [filteredEpisodes, setFilteredEpisodes] = useState<EpisodeContent[]>(episodesData);

  const typeOptions = [
    { label: '全部类型', value: 'all' },
    ...presentationTypes.map(t => ({ label: t.name, value: t.type }))
  ];

  useEffect(() => {
    const typeParam = searchParams.get('type') as PresentationType;
    if (typeParam && presentationTypes.some(t => t.type === typeParam)) {
      setSelectedType(typeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...episodesData];
    
    if (selectedType !== 'all') {
      result = result.filter(e => e.presentationType === selectedType);
    }
    
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(search) ||
        e.subtitle.toLowerCase().includes(search) ||
        e.introduction.toLowerCase().includes(search) ||
        e.tags.some(t => t.toLowerCase().includes(search)) ||
        e.city.includes(searchText)
      );
    }
    
    setFilteredEpisodes(result);
  }, [selectedType, searchText]);

  const getPresentationColor = (type: PresentationType) => {
    switch (type) {
      case 'long_poster': return 'bg-blue-500';
      case 'landscape_video': return 'bg-red-500';
      case 'h5_work': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleTypeChange = (value: PresentationType | 'all') => {
    setSelectedType(value);
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ type: value });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">📚</span>
            <h1 className="font-serif-sc text-4xl md:text-5xl font-bold">
              专栏内容
            </h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            浏览全部12期精彩内容，探索江西的山水湖林、特色美食、非物质文化遗产和古建筑
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Tag value={`共 ${episodesData.length} 期`} className="bg-white/20 text-white border-none" />
            <Tag value={`长图海报 ${episodesData.filter(e => e.presentationType === 'long_poster').length} 期`} className="bg-blue-500/50 text-white border-none" />
            <Tag value={`横屏视频 ${episodesData.filter(e => e.presentationType === 'landscape_video').length} 期`} className="bg-red-500/50 text-white border-none" />
            <Tag value={`H5作品 ${episodesData.filter(e => e.presentationType === 'h5_work').length} 期`} className="bg-green-500/50 text-white border-none" />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
              <span className="text-gray-600 font-medium whitespace-nowrap">呈现形式：</span>
              <div className="flex gap-2 flex-wrap">
                {typeOptions.map((opt, index) => (
                  <Button
                    key={index}
                    label={opt.label}
                    className={`${
                      selectedType === opt.value 
                        ? 'bg-[#2d5a3d] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } border-none px-4 py-2 text-sm`}
                    onClick={() => handleTypeChange(opt.value as PresentationType | 'all')}
                  />
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-80">
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search text-gray-400"></i>
                <InputText
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="搜索标题、标签、城市..."
                  className="w-full"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif-sc text-2xl font-semibold text-gray-800">
              {filteredEpisodes.length > 0 
                ? `找到 ${filteredEpisodes.length} 期内容` 
                : '暂无匹配内容'}
            </h2>
            {searchText && (
              <Button
                label="清除搜索"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => setSearchText('')}
              />
            )}
          </div>

          {filteredEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEpisodes.map((episode) => (
                <Card
                  key={episode.id}
                  className="card-hover cursor-pointer h-full"
                  onClick={() => navigate(`/episode/${episode.id}`)}
                >
                  <div className="relative">
                    <img
                      src={episode.coverImage}
                      alt={episode.title}
                      className="w-full h-52 object-cover rounded-t-lg -mt-5 -mx-5 mb-4"
                      style={{ width: 'calc(100% + 2.5rem)' }}
                    />
                    <div className="absolute top-2 left-2">
                      <Badge 
                        value={`第${episode.episodeNumber}期`} 
                        className={`${getPresentationColor(episode.presentationType)} text-white py-1 px-2`}
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Tag value={episode.presentationTypeName} className="bg-white/90 text-gray-700" />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Tag value={episode.city} severity="warning" className="text-xs" />
                    </div>
                  </div>
                  
                  <div className="font-serif-sc text-xl font-semibold text-gray-800 mb-2">
                    {episode.title}
                  </div>
                  <div className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {episode.subtitle}
                  </div>
                  <div className="text-xs text-gray-400 mb-4 line-clamp-2">
                    {episode.introduction}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">
                        <i className="pi pi-calendar mr-1"></i>
                        {episode.publishDate}
                      </span>
                      <span className="text-xs text-gray-500">
                        <i className="pi pi-tag mr-1"></i>
                        {episode.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {episode.tags.slice(0, 4).map((tag, i) => (
                        <Tag key={i} value={tag} severity="info" className="text-xs" />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <i className="pi pi-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到匹配内容</h3>
              <p className="text-gray-500 mb-6">请尝试其他搜索关键词或筛选条件</p>
              <Button
                label="查看全部内容"
                icon="pi pi-refresh"
                className="bg-[#2d5a3d] hover:bg-[#1e4028] text-white"
                onClick={() => {
                  setSearchText('');
                  setSelectedType('all');
                  setSearchParams({});
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Timeline Preview */}
      <div className="bg-white py-12 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif-sc text-2xl font-bold text-gray-800 text-center mb-8 section-title">
            内容时间线
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {episodesData.map((episode) => (
              <div
                key={episode.id}
                className="flex-shrink-0 w-48 cursor-pointer group"
                onClick={() => navigate(`/episode/${episode.id}`)}
              >
                <div className="relative mb-3">
                  <img
                    src={episode.coverImage}
                    alt={episode.title}
                    className="w-48 h-32 object-cover rounded-lg group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i className="pi pi-eye text-white text-2xl"></i>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-[#2d5a3d] text-white flex items-center justify-center text-sm font-bold shadow">
                    {episode.episodeNumber}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#2d5a3d] transition-colors">
                  {episode.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {episode.publishDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
