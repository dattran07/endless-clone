import { VersionContent } from "./version-content-model";

export interface Feature {
  id: string,
  stepNumber: string,
  versionContent: VersionContent[]
}