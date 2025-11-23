import type { 
  Item, 
  AppIntro, 
  SectionHero, 
  CapabilityPoints, 
  SplitSection,
  TitledSplitSection,
 } from '../../types/types';
import _content from "./index-text-content.yaml";


export interface TextContent {
  title: string;
  sections: Sections;
}

export interface Sections {
  section_00: SectionHero;
  section_01: AppIntro;
  section_02: Item;
  section_03: Item;
  section_04: Item;
  section_041: TitledSplitSection;
  section_05: CapabilityPoints;
  section_06: TitledSplitSection;
  section_07: TitledSplitSection;
  section_08: TitledSplitSection;
}

export interface Section {
  title?: string;
  items?: Item[];
  image_01?: string;
  image_02?: string;
  image_03?: string;
}





const content = _content as TextContent;
export default content