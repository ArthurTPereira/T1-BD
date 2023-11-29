import { Tag } from "domain/Tag";

export interface ManageTagService {
    
    atualizarTag(idTag : String, tagName : String, tagValue : String);

    associarTagACompeticao(idCompeticao : String, idTag : String);

    listarTodasTagsCompeticao(idCompeticao : String);

    listarTagCompeticao(idCompeticao : String, idTag : String);

    listarTag(idTag : String);

    deletarTag(idTag : String);

    cadastrarNovaTag(tagName : String, tagValue : String);

    atualizarTagVinculada(idCompeticao : String, idTag : String, tagName : String, tagValue : String);
    
    buscarTagPorNome(tagName : String);
}