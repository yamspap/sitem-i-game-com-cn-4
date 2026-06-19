// assets/content-map.js
// Site content sections, keyword tags, and search/filter helper

const contentSections = [
  {
    id: "intro",
    title: "站点简介",
    tags: ["爱游戏", "平台指南", "新手入门"],
    content: "欢迎来到爱游戏平台，这里是游戏爱好者的聚集地。"
  },
  {
    id: "news",
    title: "游戏资讯",
    tags: ["爱游戏", "最新动态", "更新公告"],
    content: "每日发布最新游戏消息与活动信息。"
  },
  {
    id: "guides",
    title: "攻略教程",
    tags: ["爱游戏", "攻略", "技巧分享"],
    content: "提供热门游戏的详细攻略与实用技巧。"
  },
  {
    id: "community",
    title: "玩家社区",
    tags: ["爱游戏", "论坛", "交流"],
    content: "玩家自由讨论、组队、分享心得的社区空间。"
  }
];

const siteConfig = {
  baseUrl: "https://sitem-i-game.com.cn",
  defaultLang: "zh-CN",
  sectionCount: contentSections.length
};

function searchSections(query, sections = contentSections) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return sections.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const contentMatch = section.content.toLowerCase().includes(lowerQuery);
    return titleMatch || tagMatch || contentMatch;
  });
}

function filterByTag(tag, sections = contentSections) {
  const lowerTag = tag.toLowerCase().trim();
  return sections.filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

function getSectionById(id, sections = contentSections) {
  return sections.find(section => section.id === id) || null;
}

function getAllTags(sections = contentSections) {
  const tagSet = new Set();
  sections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

function buildSiteMap(sections = contentSections, baseUrl = siteConfig.baseUrl) {
  return sections.map(section => ({
    url: `${baseUrl}/${section.id}`,
    title: section.title,
    tags: section.tags
  }));
}

function searchWithRelevance(query, sections = contentSections) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  const scored = sections.map(section => {
    let score = 0;
    if (section.title.toLowerCase().includes(lowerQuery)) score += 3;
    section.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerQuery)) score += 2;
    });
    if (section.content.toLowerCase().includes(lowerQuery)) score += 1;
    return { section, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.section);
}

// Example usage (uncomment to test):
// console.log(searchSections("爱游戏"));
// console.log(filterByTag("攻略"));
// console.log(buildSiteMap());
// console.log(getAllTags());
// console.log(searchWithRelevance("最新"));