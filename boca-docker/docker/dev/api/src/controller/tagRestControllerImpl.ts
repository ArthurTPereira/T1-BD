import { Request, Response } from 'express';
import { TagRestContoller } from './interface/tagRestController';
import { Tag } from '../domain/Tag';
import { ManageTagService } from '../service/interface/manageTagService';
import ManageTagServiceImpl from '../service/manageTagServiceImpl';
import { idText, isEmptyStatement } from 'typescript';
import TagNotFoundException from '../exception/tagNotFoundException';
import UndefinedParameter from '../exception/undefinedParameter';

class TagRestContollerImpl implements TagRestContoller {


    constructor() {
        this.cadastrarNovaTag = this.cadastrarNovaTag.bind(this);
        this.associarTagACompeticao = this.associarTagACompeticao.bind(this);
        this.cadastrarEAssociarNovaTag = this.cadastrarEAssociarNovaTag.bind(this);
        this.atualizarTag = this.atualizarTag.bind(this);
        this.deletarTag = this.deletarTag.bind(this);
        this.listarTag = this.listarTag.bind(this);
        this.listarTagCompeticao = this.listarTagCompeticao.bind(this);
        this.listarTodasTagsCompeticao = this.listarTodasTagsCompeticao.bind(this);
        this.atualizarTagVinculada = this.atualizarTagVinculada.bind(this);
        this.buscarTagPorNome = this.buscarTagPorNome.bind(this);
  
        console.log('Construtor iniciando');
    }

    public async listarTodasTagsCompeticao(req: Request, res: Response){
        try {
            const idContest = req.params.id_c;

            if(idContest == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }
            
            const result = await ManageTagServiceImpl.listarTodasTagsCompeticao(idContest);
            res.status(200).json(result.rows); // 200 -OK
        } catch(error) {
            if (error instanceof TagNotFoundException) {
                console.error('Tag não encontrada');
                res.status(404).json({ error: TagNotFoundException });  // 404 - NOT FOUND

             }else if(error instanceof UndefinedParameter){
                console.error('Erro ao executar a query', error);
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request
             }
             
             else {
                console.error('Erro ao executar a query');
                res.status(500).json({ error: "Erro inesperado" }); // 500 - Internal Server Error
            }
        } 
    }

    public async listarTagCompeticao(req: Request, res: Response){
        try{
            const idContest = req.params.id_c;
            const idTag = req.params.id_t;

            if(idContest == undefined || idTag == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result = await ManageTagServiceImpl.listarTagCompeticao(idContest, idTag);
            res.status(200).json(result.rows); // 200 - OK
        }catch(error){
            if (error instanceof TagNotFoundException) {
                res.status(404).json({ error: "Tag não encontrada" });  // 404 - NOT FOUND

             }else if(error instanceof UndefinedParameter){
                console.error('Erro ao executar a query', error);
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request
             }
             
             else {
                console.error('Erro ao executar a query');
                res.status(500).json({ error: "Erro inesperado" }); // 500 - Internal Server Error
            }
        }
    }

    public async cadastrarNovaTag(req: Request, res: Response){
        try {
            const tagName = req.body.tag_name;
            const tagValue = req.body.tag_value;

            if(tagName == undefined || tagValue == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result = await ManageTagServiceImpl.cadastrarNovaTag(tagName,tagValue);
            res.status(200).json(result.rows); // 200 - OK
            return result.rows;

        }catch(error) {

            
            if(error.constraint == "unique_tag_name_value"){
                console.error('Erro ao executar a query', error);
                res.status(409).json({ error: 'Já existe tag com esse nome' }); // 409 - Conflict

            }else if(error instanceof UndefinedParameter){
                console.error('Erro ao executar a query', error);
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request

            }else {
                console.error('Erro ao executar a query');
                res.status(500).json({ error: "Erro inesperado" }); // 500 - Internal Server Error
            }
        }
    }

    public async associarTagACompeticao(req: Request, res: Response){
        try {
            const idContest = req.params.id_c;
            const idTag = req.params.id_t;

            if(idTag == undefined || idContest == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result = await ManageTagServiceImpl.associarTagACompeticao(idContest,idTag);
            res.status(200).json(result.rows); // 200 - OK

        }catch(error) {
            if(error instanceof UndefinedParameter){
                console.error('Erro ao executar a query', error);
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request

            }else if(error.constraint == "unique_tag_name_value"){
                console.error('Erro ao executar a query', error);
                res.status(409).json({ error: 'Já Cadastrado' }); // 409 - Conflict 
                
            }else{
                console.error('Erro ao executar a query', error);
                res.status(500).json({ error: 'Ocorreu um erro' }); // 500 - Internal Server Error
            }
        }
    }

    public async cadastrarEAssociarNovaTag(req: Request, res: Response){
        try {

            const tagName = req.body.tag_name;
            const tagValue = req.body.tag_value;

            if(tagName == undefined || tagValue == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result0 = await ManageTagServiceImpl.cadastrarNovaTag(tagName,tagValue);

            const idTag = JSON.parse(JSON.stringify(result0.rows[0])).tag_id;
            const idContest = req.params.id_c;

            if(idContest == undefined || idTag == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result1 = await ManageTagServiceImpl.associarTagACompeticao(idContest, idTag);

            res.status(200).json("Tag cadastrada e associada com sucesso");

        }catch(error) {
            if(error instanceof UndefinedParameter){
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request

            }else if(error.constraint == "unique_tag_name_value"){
                console.error('Erro ao executar a query', error);
                res.status(409).json({ error: 'Já Cadastrado' }); // 409 - Conflict 

            }else{
                console.error('Erro ao executar a query', error);
                res.status(500).json({ error: 'Ocorreu um erro' }); // 500 - Internal Server Error
            }
            
        }
    }

    public async deletarTag(req: Request, res: Response){
        try {
            const idTag = req.params.id_t;
            const idContest = req.params.id_c;

            if(idTag == undefined || idContest == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result = await ManageTagServiceImpl.deletarTagVinculada(idContest, idTag);
            res.status(200).json(result.rows); // 200 - OK
        }catch(error) {
            if(error instanceof UndefinedParameter){
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request
            }else if(error.constraint == "contest_tags_tag_id_fkey"){
                console.error('Erro ao executar a query', error);
                res.status(400).json({ error: 'Ocorreu um erro' }); // 400 - Bad Request
            }else{
                console.error('Erro ao executar a query', error);
                res.status(500).json({ error: 'Ocorreu um erro' }); // 500 - Internal Server Error
            }
            
        }
    }

    public async atualizarTag(req: Request, res: Response){
        try {
            const idTag = req.params.id_t;

            const tagName = req.body.tag_name;
            const tagValue = req.body.tag_value;

            if(idTag == undefined || tagName == undefined || tagValue == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result = await ManageTagServiceImpl.atualizarTag(idTag, tagName, tagValue);
            res.status(200).json(result.rows); // 200 - OK
        }catch(error) {
            if(error instanceof UndefinedParameter){
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request
            } else {
                console.error('Erro ao executar a query', error);
                res.status(500).json({ error: 'Ocorreu um erro' }); // 500 - Internal Server Error
            }
        }
    }

    public async atualizarTagVinculada(req: Request, res: Response){
        try {
            const idTag = req.params.id_t;
            const idCompeticao = req.params.id_c;

            const tagName = req.body.tag_name;
            const tagValue = req.body.tag_value;

            if(idTag == undefined || idCompeticao == undefined || tagName == undefined || tagValue == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }

            const result = await ManageTagServiceImpl.atualizarTagVinculada(idCompeticao, idTag, tagName, tagValue);
            res.status(200).json(result.rows); // 200 - OK
        }catch(error) {
            if(error instanceof UndefinedParameter){
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request
            } else {
                console.error('Erro ao executar a query', error);
                res.status(500).json({ error: 'Ocorreu um erro' }); // 500 - Internal Server Error
            }
        }
    }

    public async listarTag(req: Request, res: Response){
        try {
            const idTag = req.params.id_t;
            if(idTag == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }
            const result = await ManageTagServiceImpl.listarTag(idTag);
            res.status(200).json(result.rows); // 200 - OK
        }catch(error) {
            if(error instanceof UndefinedParameter){
                console.error('Erro ao executar a query', error);
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request
            }else{
                console.error('Erro ao executar a query', error);
                res.status(500).json({ error: 'Ocorreu um erro' }); // 500 - Internal Server Error
            }
            
        }
    }

    public async buscarTagPorNome(req: Request, res: Response){

        try{
            const tagName = req.body.tag_name;
            if(tagName == undefined){
                throw new UndefinedParameter(UndefinedParameter.INVALIDA_VALUE);
            }
            const result = await ManageTagServiceImpl.buscarTagPorNome(tagName);

            res.status(200).json(result.rows);
        }catch(error){
            if(error instanceof UndefinedParameter){
                console.error('Erro ao executar a query', error);
                res.status(400).json({error: "Valor de parametro inválido"}); // 400 - Bad Request
            }else{
                console.error('Erro ao executar a query', error);
                res.status(500).json({ error: 'Ocorreu um erro' }); // 500 - Internal Server Error
            }
        }    

    }
}

export default new TagRestContollerImpl()
