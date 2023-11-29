import { Tag } from "../domain/Tag";
import { ManageTagService } from "./interface/manageTagService";
import TagDAO  from "../persistance/tagDAO";
import TagNotFoundException from "../exception/tagNotFoundException";

class ManageTagServiceImpl implements ManageTagService {

    constructor(){
        this.listarTag = this.listarTag.bind(this);
        this.associarTagACompeticao = this.associarTagACompeticao.bind(this);
        this.cadastrarNovaTag = this.cadastrarNovaTag.bind(this);
        this.listarTodasTagsCompeticao = this.listarTodasTagsCompeticao.bind(this);
        this.listarTagCompeticao = this.listarTagCompeticao.bind(this);
        this.deletarTag = this.deletarTag.bind(this);
        this.atualizarTag = this.atualizarTag.bind(this);
        this.deletarTagVinculada = this.deletarTagVinculada.bind(this);
        this.buscarTagPorNome = this.buscarTagPorNome.bind(this);

        console.log('Service iniciando');

    }

    public async atualizarTag(idTag : String, tagName : String, tagValue : String){
        const resp = await TagDAO.atualizarTag(idTag, tagName, tagValue);
        return resp;
    }
    public async associarTagACompeticao(idCompeticao : String, idTag : String){
        const resp = await TagDAO.associarTagACompeticao(idCompeticao,idTag);
        return resp; 
    }

    public async listarTodasTagsCompeticao(idCompeticao : String){
        const resp = await TagDAO.listarTodasTagsCompeticao(idCompeticao);
        if(resp.rows.length == 0){
            throw new TagNotFoundException("Tag não foi encontrada");
        }
        return resp;
    }

    public async listarTagCompeticao(idCompeticao : String, idTag : String){
        const resp = await TagDAO.listarTagCompeticao(idCompeticao,idTag);
        if(resp.rows.length == 0){
            throw new TagNotFoundException("Tag não foi encontrada");
        }
        return resp;
    }


    public async listarTag(idTag : String){
        const resp = await TagDAO.listarTag(idTag);
        if(resp.rows.length == 0){
            throw new TagNotFoundException("Tag não foi encontrada");
        }
        return resp;
    }

    public async deletarTag(idTag : String){
        const resp = await TagDAO.deletarTag(idTag);
        return resp;
    }

    public async deletarTagVinculada(idCompeticao : String, idTag : String){
        const resp0 = await TagDAO.desvincularTag(idCompeticao, idTag);
        const resp1 = await TagDAO.deletarTag(idTag);
        return resp1;
    }

    public async cadastrarNovaTag(tagName : String, tagValue : String) {
        const resp = await TagDAO.cadastrarNovaTag(tagName,tagValue);
        return resp;
    }

    public async atualizarTagVinculada(idCompeticao : String, idTag : String, tagName : String, tagValue : String){
        const resp = await TagDAO.atualizarTagVinculada(idCompeticao, idTag, tagName, tagValue);
        return resp;
    }

    public async buscarTagPorNome(tagName : String){
        const resp = await TagDAO.listarTagPorNome(tagName);
        return resp;
    }

}

export default new ManageTagServiceImpl()