export interface TvShow {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  nextEpisode: string;
  rating: number;
  genre: string;
  episodes: number;
  seasons: number;
}

export const tvShowsData: TvShow[] = [
  {
    id: 1,
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    longDescription: "Walter White, a high school chemistry teacher in Albuquerque, New Mexico, is diagnosed with stage III lung cancer and given two years to live. Concerned about his family's future, he teams up with a former student, Jesse Pinkman, to manufacture and sell methamphetamine. As the series progresses, Walter's transformation into the drug lord 'Heisenberg' becomes increasingly dark and complex.",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80",
    nextEpisode: "S05E16 - Felina",
    rating: 9.5,
    genre: "Drama, Crime, Thriller",
    episodes: 62,
    seasons: 5,
  },
  {
    id: 2,
    title: "The Office",
    description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    longDescription: "The Office is an American mockumentary sitcom television series that depicts the everyday work lives of office employees at the Scranton, Pennsylvania, branch of the fictional Dunder Mifflin Paper Company. Michael Scott, the awkward regional manager, leads a team of eccentric employees through daily office life with hilarious and often cringeworthy results.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    nextEpisode: "S09E25 - Finale",
    rating: 9.0,
    genre: "Comedy",
    episodes: 201,
    seasons: 9,
  },
  {
    id: 3,
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying forces in order to get him back.",
    longDescription: "Set in the 1980s in the fictional town of Hawkins, Indiana, the first season focuses on the investigation into the disappearance of a young boy amid supernatural events occurring around the town, including the appearance of a girl with psychokinetic abilities who helps the missing boy's friends in their own search. The show blends science fiction, horror, and 80s nostalgia into a thrilling adventure.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    nextEpisode: "S05E01 - Chapter One: The Crawl",
    rating: 8.7,
    genre: "Sci-Fi, Horror, Drama",
    episodes: 34,
    seasons: 4,
  },
  {
    id: 4,
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    longDescription: "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is A Game of Thrones. Set on the fictional continents of Westeros and Essos, Game of Thrones has a large ensemble cast and follows several story arcs throughout the course of the show.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    nextEpisode: "S08E06 - The Iron Throne",
    rating: 9.2,
    genre: "Fantasy, Drama, Adventure",
    episodes: 73,
    seasons: 8,
  },
  {
    id: 5,
    title: "The Mandalorian",
    description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    longDescription: "The Mandalorian is an American space Western television series created by Jon Favreau for the streaming service Disney+. It is the first live-action series in the Star Wars franchise, beginning five years after the events of Return of the Jedi (1983). Pedro Pascal stars as the title character, a lone bounty hunter who protects 'The Child' (Grogu).",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
    nextEpisode: "S03E08 - The Return",
    rating: 8.8,
    genre: "Sci-Fi, Action, Adventure",
    episodes: 24,
    seasons: 3,
  },
  {
    id: 6,
    title: "Rick and Morty",
    description: "An animated series that follows the exploits of a super scientist and his not-so-bright grandson.",
    longDescription: "Rick Sanchez, a cynical mad scientist, has just returned home to his family after 20 years. He moves in with his daughter Beth, a veterinary surgeon, and her family. Rick's 14-year-old grandson Morty is his main sidekick in his adventures across the multiverse, which often interfere with Morty's family and school life.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    nextEpisode: "S07E10 - Fear No Mort",
    rating: 9.1,
    genre: "Animation, Comedy, Sci-Fi",
    episodes: 71,
    seasons: 7,
  },
];
