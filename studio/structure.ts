import type {StructureResolver} from "sanity/structure";

export const journalStructure: StructureResolver = (S) =>
  S.list()
    .title("Freedom Generation School")
    .items([
      S.documentTypeListItem("journalPost")
        .title("Journal")
        .icon(() => "Journal"),
    ]);
