import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: '1',
      title: '经典意大利番茄罗勒意面',
      description: '一道简单而美味的意大利经典意面，新鲜番茄与罗勒的完美结合。',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20Italian%20pasta%20with%20tomatoes%20and%20basil%20on%20white%20plate&image_size=square_hd',
      category: '意大利菜',
      prepTime: '10分钟',
      cookTime: '15分钟',
      totalTime: '25分钟',
      servings: 4,
      difficulty: 'easy',
      rating: 4.8,
      ingredients: [
        { id: '1-1', name: '意大利面', amount: 400, unit: 'g', category: '主食' },
        { id: '1-2', name: '新鲜番茄', amount: 6, unit: '个', category: '蔬菜' },
        { id: '1-3', name: '新鲜罗勒叶', amount: 1, unit: '束', category: '香草' },
        { id: '1-4', name: '大蒜', amount: 4, unit: '瓣', category: '调味品' },
        { id: '1-5', name: '橄榄油', amount: 60, unit: 'ml', category: '油类' },
        { id: '1-6', name: '盐', amount: 1, unit: '茶匙', category: '调味品' },
        { id: '1-7', name: '黑胡椒', amount: 1, unit: '茶匙', category: '调味品' },
        { id: '1-8', name: '帕玛森芝士', amount: 50, unit: 'g', category: '奶制品' }
      ],
      steps: [
        { id: '1-s1', order: 1, description: '将意大利面按照包装说明煮至八成熟，沥干备用，保留约1杯煮面水。', duration: '10分钟' },
        { id: '1-s2', order: 2, description: '番茄切块，大蒜切末，罗勒叶洗净备用。', duration: '5分钟' },
        { id: '1-s3', order: 3, description: '锅中倒入橄榄油，小火炒香蒜末，注意不要炒焦。', duration: '2分钟' },
        { id: '1-s4', order: 4, description: '加入番茄块，中火翻炒至番茄出汁变软，加盐和黑胡椒调味。', duration: '8分钟' },
        { id: '1-s5', order: 5, description: '将煮好的意大利面加入酱汁中，加入适量煮面水，翻拌均匀。', duration: '2分钟' },
        { id: '1-s6', order: 6, description: '关火，加入大部分罗勒叶翻拌，撒上帕玛森芝士，用剩余罗勒叶点缀即可。', duration: '1分钟' }
      ],
      tags: ['素食', '快手菜', '意大利', '意面']
    },
    {
      id: '2',
      title: '日式照烧鸡排饭',
      description: '外焦里嫩的照烧鸡排，搭配香甜的照烧酱汁，简单美味的日式料理。',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20teriyaki%20chicken%20rice%20bowl%20with%20vegetables&image_size=square_hd',
      category: '日式料理',
      prepTime: '15分钟',
      cookTime: '20分钟',
      totalTime: '35分钟',
      servings: 2,
      difficulty: 'medium',
      rating: 4.9,
      ingredients: [
        { id: '2-1', name: '鸡腿肉', amount: 500, unit: 'g', category: '肉类' },
        { id: '2-2', name: '酱油', amount: 60, unit: 'ml', category: '调味品' },
        { id: '2-3', name: '味醂', amount: 45, unit: 'ml', category: '调味品' },
        { id: '2-4', name: '清酒', amount: 45, unit: 'ml', category: '调味品' },
        { id: '2-5', name: '白砂糖', amount: 30, unit: 'g', category: '调味品' },
        { id: '2-6', name: '大蒜', amount: 3, unit: '瓣', category: '调味品' },
        { id: '2-7', name: '生姜', amount: 1, unit: '小块', category: '调味品' },
        { id: '2-8', name: '白芝麻', amount: 1, unit: '汤匙', category: '坚果' },
        { id: '2-9', name: '米饭', amount: 2, unit: '碗', category: '主食' },
        { id: '2-10', name: '西兰花', amount: 100, unit: 'g', category: '蔬菜' }
      ],
      steps: [
        { id: '2-s1', order: 1, description: '鸡腿肉去骨，用叉子在肉面戳几下，便于入味。', duration: '5分钟' },
        { id: '2-s2', order: 2, description: '制作照烧酱汁：将酱油、味醂、清酒、白砂糖混合，加入蒜末和姜末。', duration: '5分钟' },
        { id: '2-s3', order: 3, description: '平底锅不放油，将鸡腿肉皮朝下放入，中火煎至金黄出油。', duration: '8分钟' },
        { id: '2-s4', order: 4, description: '翻面继续煎至肉面金黄，倒出多余油脂。', duration: '5分钟' },
        { id: '2-s5', order: 5, description: '倒入照烧酱汁，中小火收汁，期间翻动鸡腿肉使其均匀裹上酱汁。', duration: '7分钟' },
        { id: '2-s6', order: 6, description: '西兰花焯水，鸡排切块，与米饭一起摆盘，淋上剩余酱汁，撒上白芝麻即可。', duration: '2分钟' }
      ],
      tags: ['日式', '鸡肉', '盖饭', '家常']
    },
    {
      id: '3',
      title: '泰式冬阴功汤',
      description: '酸辣鲜香的泰国经典汤品，虾与蘑菇的完美搭配，开胃又暖胃。',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Thai%20tom%20yum%20soup%20with%20shrimp%20and%20lemongrass&image_size=square_hd',
      category: '泰国菜',
      prepTime: '20分钟',
      cookTime: '25分钟',
      totalTime: '45分钟',
      servings: 4,
      difficulty: 'medium',
      rating: 4.7,
      ingredients: [
        { id: '3-1', name: '大虾', amount: 300, unit: 'g', category: '海鲜' },
        { id: '3-2', name: '草菇', amount: 150, unit: 'g', category: '蔬菜' },
        { id: '3-3', name: '香茅', amount: 2, unit: '根', category: '香草' },
        { id: '3-4', name: '南姜', amount: 3, unit: '片', category: '调味品' },
        { id: '3-5', name: '青柠叶', amount: 5, unit: '片', category: '香草' },
        { id: '3-6', name: '小米辣', amount: 4, unit: '个', category: '调味品' },
        { id: '3-7', name: '冬阴功酱', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '3-8', name: '椰浆', amount: 200, unit: 'ml', category: '奶制品' },
        { id: '3-9', name: '鱼露', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '3-10', name: '青柠汁', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '3-11', name: '香菜', amount: 1, unit: '束', category: '香草' }
      ],
      steps: [
        { id: '3-s1', order: 1, description: '大虾去壳去虾线，保留虾头备用；草菇切片，香茅切段拍扁，南姜切片，小米辣切段。', duration: '10分钟' },
        { id: '3-s2', order: 2, description: '锅中加水或鸡汤，放入香茅、南姜、青柠叶、小米辣，大火煮沸后转小火煮10分钟出香。', duration: '15分钟' },
        { id: '3-s3', order: 3, description: '捞出香料，加入冬阴功酱搅拌均匀，放入草菇煮5分钟。', duration: '5分钟' },
        { id: '3-s4', order: 4, description: '放入虾仁和虾头，煮至虾仁变色卷曲。', duration: '3分钟' },
        { id: '3-s5', order: 5, description: '加入椰浆、鱼露、青柠汁调味，搅拌均匀。', duration: '2分钟' },
        { id: '3-s6', order: 6, description: '关火，撒上香菜叶即可趁热享用。', duration: '1分钟' }
      ],
      tags: ['泰式', '海鲜', '汤品', '酸辣']
    },
    {
      id: '4',
      title: '法式焦糖布丁',
      description: '经典法式甜点，口感丝滑细腻，顶部焦糖香脆，甜蜜又浪漫。',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=french%20creme%20brulee%20dessert%20with%20caramel%20top&image_size=square_hd',
      category: '甜点',
      prepTime: '30分钟',
      cookTime: '45分钟',
      totalTime: '2小时15分钟',
      servings: 6,
      difficulty: 'hard',
      rating: 4.9,
      ingredients: [
        { id: '4-1', name: '蛋黄', amount: 6, unit: '个', category: '蛋类' },
        { id: '4-2', name: '全蛋液', amount: 1, unit: '个', category: '蛋类' },
        { id: '4-3', name: '细砂糖', amount: 100, unit: 'g', category: '糖' },
        { id: '4-4', name: '香草精', amount: 1, unit: '茶匙', category: '调味品' },
        { id: '4-5', name: '淡奶油', amount: 600, unit: 'ml', category: '奶制品' },
        { id: '4-6', name: '牛奶', amount: 200, unit: 'ml', category: '奶制品' },
        { id: '4-7', name: '红糖或黄糖', amount: 60, unit: 'g', category: '糖' },
        { id: '4-8', name: '盐', amount: 1, unit: '小撮', category: '调味品' }
      ],
      steps: [
        { id: '4-s1', order: 1, description: '将蛋黄和全蛋液混合，加入50g细砂糖和盐，轻轻搅拌均匀，注意不要打发过多空气。', duration: '10分钟' },
        { id: '4-s2', order: 2, description: '淡奶油和牛奶混合，加入香草精，小火加热至温热（约50°C），不要煮沸。', duration: '10分钟' },
        { id: '4-s3', order: 3, description: '将温热的奶液缓缓倒入蛋液中，边倒边不停搅拌均匀。', duration: '5分钟' },
        { id: '4-s4', order: 4, description: '将布丁液过筛2-3次，使口感更加细腻，然后倒入6个布丁杯中。', duration: '10分钟' },
        { id: '4-s5', order: 5, description: '将布丁杯放入深烤盘中，烤盘注入热水至布丁杯高度的2/3处，放入预热好的烤箱，160°C烤45-50分钟。', duration: '50分钟' },
        { id: '4-s6', order: 6, description: '取出布丁，放凉后冷藏至少4小时或过夜。食用前在表面撒上红糖或黄糖，用喷枪烤至焦糖焦化，放凉2分钟即可。', duration: '5分钟' }
      ],
      tags: ['法式', '甜点', '烘焙', '焦糖']
    },
    {
      id: '5',
      title: '四川麻婆豆腐',
      description: '麻辣鲜香的四川经典名菜，嫩滑的豆腐与牛肉末的完美结合，下饭神器。',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20mapo%20tofu%20spicy%20dish%20with%20beef&image_size=square_hd',
      category: '川菜',
      prepTime: '15分钟',
      cookTime: '15分钟',
      totalTime: '30分钟',
      servings: 4,
      difficulty: 'medium',
      rating: 4.8,
      ingredients: [
        { id: '5-1', name: '嫩豆腐', amount: 500, unit: 'g', category: '豆制品' },
        { id: '5-2', name: '牛肉末', amount: 150, unit: 'g', category: '肉类' },
        { id: '5-3', name: '郫县豆瓣酱', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '5-4', name: '花椒粉', amount: 1, unit: '茶匙', category: '调味品' },
        { id: '5-5', name: '辣椒粉', amount: 1, unit: '茶匙', category: '调味品' },
        { id: '5-6', name: '蒜末', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '5-7', name: '姜末', amount: 1, unit: '汤匙', category: '调味品' },
        { id: '5-8', name: '葱花', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '5-9', name: '生抽', amount: 1, unit: '汤匙', category: '调味品' },
        { id: '5-10', name: '料酒', amount: 1, unit: '汤匙', category: '调味品' },
        { id: '5-11', name: '水淀粉', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '5-12', name: '花椒油', amount: 1, unit: '汤匙', category: '油类' }
      ],
      steps: [
        { id: '5-s1', order: 1, description: '豆腐切成2厘米见方的块，放入加了盐的开水中焯烫2分钟，捞出沥干备用。', duration: '5分钟' },
        { id: '5-s2', order: 2, description: '锅中倒油，小火炒香牛肉末至变色，加入料酒去腥。', duration: '3分钟' },
        { id: '5-s3', order: 3, description: '加入郫县豆瓣酱，小火炒出红油，加入蒜末、姜末炒香。', duration: '3分钟' },
        { id: '5-s4', order: 4, description: '加入适量清水或高汤，放入生抽、辣椒粉调味，大火煮沸。', duration: '2分钟' },
        { id: '5-s5', order: 5, description: '轻轻放入豆腐块，中小火煮5分钟让豆腐入味，期间轻轻推动豆腐避免粘锅。', duration: '5分钟' },
        { id: '5-s6', order: 6, description: '淋入水淀粉勾薄芡，轻轻翻拌均匀，撒上花椒粉和葱花，淋上花椒油即可出锅。', duration: '2分钟' }
      ],
      tags: ['川菜', '麻辣', '豆腐', '下饭']
    },
    {
      id: '6',
      title: '墨西哥牛肉卷饼',
      description: '香辣入味的牛肉与新鲜蔬菜的完美组合，配上莎莎酱和酸奶油，口感丰富。',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mexican%20beef%20tacos%20with%20vegetables%20and%20salsa&image_size=square_hd',
      category: '墨西哥菜',
      prepTime: '20分钟',
      cookTime: '25分钟',
      totalTime: '45分钟',
      servings: 4,
      difficulty: 'medium',
      rating: 4.6,
      ingredients: [
        { id: '6-1', name: '牛绞肉', amount: 500, unit: 'g', category: '肉类' },
        { id: '6-2', name: '墨西哥卷饼', amount: 8, unit: '张', category: '主食' },
        { id: '6-3', name: '洋葱', amount: 1, unit: '个', category: '蔬菜' },
        { id: '6-4', name: '甜椒', amount: 2, unit: '个', category: '蔬菜' },
        { id: '6-5', name: '大蒜', amount: 4, unit: '瓣', category: '调味品' },
        { id: '6-6', name: '墨西哥调味料', amount: 2, unit: '汤匙', category: '调味品' },
        { id: '6-7', name: '番茄丁罐头', amount: 400, unit: 'g', category: '蔬菜' },
        { id: '6-8', name: '黑豆', amount: 200, unit: 'g', category: '豆类' },
        { id: '6-9', name: '生菜丝', amount: 100, unit: 'g', category: '蔬菜' },
        { id: '6-10', name: '切达芝士丝', amount: 100, unit: 'g', category: '奶制品' },
        { id: '6-11', name: '酸奶油', amount: 100, unit: 'ml', category: '奶制品' },
        { id: '6-12', name: '青柠', amount: 2, unit: '个', category: '水果' }
      ],
      steps: [
        { id: '6-s1', order: 1, description: '洋葱切丁，甜椒去籽切丁，大蒜切末，黑豆沥干备用。', duration: '10分钟' },
        { id: '6-s2', order: 2, description: '锅中倒油，中火炒香洋葱丁，加入蒜末炒香，然后加入甜椒丁翻炒2分钟。', duration: '5分钟' },
        { id: '6-s3', order: 3, description: '加入牛绞肉，炒至变色并打散，加入墨西哥调味料翻炒均匀。', duration: '5分钟' },
        { id: '6-s4', order: 4, description: '加入番茄丁罐头和黑豆，小火炖煮10分钟，让味道融合。', duration: '10分钟' },
        { id: '6-s5', order: 5, description: '同时，将墨西哥卷饼按照包装说明加热，可以用平底锅或微波炉。', duration: '3分钟' },
        { id: '6-s6', order: 6, description: '组装卷饼：在温热的卷饼上放上牛肉馅、生菜丝、芝士丝，挤上酸奶油，淋上青柠汁，卷起即可享用。', duration: '2分钟' }
      ],
      tags: ['墨西哥', '牛肉', '卷饼', '快手']
    }
  ];

  private categories: string[] = ['意大利菜', '日式料理', '泰国菜', '甜点', '川菜', '墨西哥菜'];

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    return of(this.recipes.find(recipe => recipe.id === id));
  }

  getRecipesByCategory(category: string): Observable<Recipe[]> {
    return of(this.recipes.filter(recipe => recipe.category === category));
  }

  getCategories(): Observable<string[]> {
    return of(this.categories);
  }

  searchRecipes(keyword: string): Observable<Recipe[]> {
    const lowerKeyword = keyword.toLowerCase();
    return of(
      this.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(lowerKeyword) ||
        recipe.description.toLowerCase().includes(lowerKeyword) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
      )
    );
  }
}
