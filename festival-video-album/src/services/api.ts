import type { VideoTask } from '../types/index';
import { HolidayTheme, VideoStyle, ProcessingStep } from '../types/index';

// 主题和样式的提示词配置
const themePrompts: Record<HolidayTheme, string> = {
  [HolidayTheme.CHRISTMAS]: 'Christmas holiday celebration with snow, Christmas trees, Santa Claus, and festive decorations',
  [HolidayTheme.NEW_YEAR]: 'New Year celebration with fireworks, champagne, countdown, and joyful atmosphere',
  [HolidayTheme.BIRTHDAY]: 'Birthday celebration with cakes, balloons, confetti, and birthday wishes',
  [HolidayTheme.WEDDING]: 'Wedding celebration with elegant decorations, flowers, romantic atmosphere, and wedding ceremony',
};

const stylePrompts: Record<VideoStyle, string> = {
  [VideoStyle.CINEMATIC]: 'cinematic style with dramatic lighting, professional camera angles, and movie-like transitions',
  [VideoStyle.DREAMY]: 'dreamy style with soft focus, pastel colors, magical effects, and ethereal atmosphere',
  [VideoStyle.ENERGETIC]: 'energetic style with fast-paced cuts, vibrant colors, dynamic transitions, and upbeat rhythm',
  [VideoStyle.ELEGANT]: 'elegant style with smooth transitions, sophisticated colors, graceful movements, and refined aesthetics',
};

// 生成视频提示词
export function generatePrompt(theme: HolidayTheme, style: VideoStyle): string {
  return `Create a beautiful video based on the provided image with the following theme and style:

Theme: ${themePrompts[theme]}
Style: ${stylePrompts[style]}

Make sure the video is visually stunning, emotionally engaging, and perfectly matches the festive atmosphere requested.`;
}

// 模拟视频生成API
// 注意：在实际应用中，这里应该调用真实的视频生成API（如Runway ML, Stable Video Diffusion等）

export interface VideoGenerationResponse {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  videoUrl?: string;
  error?: string;
}

// 模拟API延迟
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 分析照片（步骤1）
export async function analyzePhotos(): Promise<void> {
  // 模拟分析过程
  await delay(1500);
  console.log('Photos analyzed successfully');
}

// 提交视频生成任务（步骤2）
export async function submitVideoTask(
  imageFile: File,
  prompt: string
): Promise<VideoTask> {
  // 模拟任务提交
  await delay(800);
  
  const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  console.log(`Task submitted: ${taskId}`);
  
  return {
    id: taskId,
    imageId: imageFile.name, // 简单使用文件名作为imageId
    status: 'processing',
  };
}

// 检查任务状态（步骤3 - 创建视频）
export async function checkTaskStatus(taskId: string): Promise<VideoGenerationResponse> {
  // 模拟状态检查
  await delay(2000);
  
  // 模拟进度（实际应用中应该从API获取）
  const progress = Math.floor(Math.random() * 100);
  
  // 模拟完成状态
  const isCompleted = progress > 80;
  
  if (isCompleted) {
    // 模拟生成的视频URL
    // 实际应用中这里会返回真实的视频URL
    return {
      taskId,
      status: 'completed',
      progress: 100,
      videoUrl: `https://example.com/videos/${taskId}.mp4`, // 示例URL
    };
  }
  
  return {
    taskId,
    status: 'processing',
    progress,
  };
}

// 最终处理（步骤4）
export async function finalizeVideos(): Promise<void> {
  // 模拟最终处理过程
  await delay(1000);
  console.log('Videos finalized successfully');
}

// 下载视频
export async function downloadVideo(videoUrl: string, fileName: string): Promise<void> {
  try {
    // 模拟下载
    // 实际应用中：
    // const response = await fetch(videoUrl);
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    
    console.log(`Downloading video: ${fileName} from ${videoUrl}`);
    
    // 模拟下载延迟
    await delay(500);
    
    // 这里可以创建一个a标签来触发下载
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = fileName;
    // link.click();
    // window.URL.revokeObjectURL(url);
    
    console.log('Download completed');
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to download video');
  }
}

// 分享视频
export async function shareVideo(
  videoUrl: string,
  title: string,
  text: string
): Promise<boolean> {
  try {
    // 检查是否支持 Web Share API
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url: videoUrl,
      });
      return true;
    }
    
    // 如果不支持 Web Share API，尝试复制到剪贴板
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(videoUrl);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Share failed:', error);
    return false;
  }
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    return false;
  }
}
