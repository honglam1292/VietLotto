interface DataCarousel {
  title: string;
  subtitle: string;
  video: string;
}

interface DataIntroduce {
  title: string;
  content: string;
  background: string;
}

interface CareerHighlight {
  id: number;
  title: string;
  content: string;
}

interface DataCareerHighlights {
  title: string;
  data: CareerHighlight[];
  background: string;
}

interface AwardAchievement {
  id: number;
  title: string;
  content: string[];
}

interface DataAwardsAchievements {
  title: string;
  data: AwardAchievement[];
  background: string;
}

interface GalleryItem {
  id: number;
  image: string;
}

interface DataGallery {
  title: string;
  content: GalleryItem[];
}

interface DataTrailer {
  title: string;
  content: string;
}

export interface PersonProfile {
  id: number;
  name: string;
  color: string;
  dataCarousel: DataCarousel;
  dataIntroduce: DataIntroduce;
  dataCareerHighlights: DataCareerHighlights | null;
  dataAwardsAchievements: DataAwardsAchievements;
  dataGallery: DataGallery;
  dataTrailer: DataTrailer;
}
