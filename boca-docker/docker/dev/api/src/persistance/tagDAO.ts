import { Tag } from "../domain/Tag";
import { BaseDAO } from "./baseDAO";

class TagDAO extends BaseDAO {
    tableName : String;

    constructor (){
        super();
        this.listarTag = this.listarTag.bind(this);
        this.associarTagACompeticao = this.associarTagACompeticao.bind(this);
        this.cadastrarNovaTag = this.cadastrarNovaTag.bind(this);
        this.listarTodasTagsCompeticao = this.listarTodasTagsCompeticao.bind(this);
        this.listarTagCompeticao = this.listarTagCompeticao.bind(this);
        this.deletarTag = this.deletarTag.bind(this);
        this.desvincularTag = this.desvincularTag.bind(this);
        this.executeSQLCode = this.executeSQLCode.bind(this);
        this.atualizarTag = this.atualizarTag.bind(this);
        this.listarTagPorNome = this.listarTagPorNome.bind(this);

        console.log('DAO iniciando');
        this.tableName = Tag.getTableName();
    }

    public listarTodasTagsCompeticao(idCompeticao : String){
        const query = `
        SELECT tags.tag_id, tags.tag_name, tags.tag_value
        FROM contest_tags
        INNER JOIN contesttable ON contest_tags.contest_id = contesttable.contestnumber
        INNER JOIN tags ON contest_tags.tag_id = tags.tag_id
        WHERE contestnumber = ${idCompeticao}
        `;

        const result = this.executeSQLCode(query);

        return result;
    }

    public listarTagCompeticao(idCompeticao : String, idTag : String) {
        const query = `
        SELECT tags.tag_id, tags.tag_name, tags.tag_value
        FROM contest_tags
        INNER JOIN contesttable ON contest_tags.contest_id = contesttable.contestnumber
        INNER JOIN tags ON contest_tags.tag_id = tags.tag_id
        WHERE contestnumber = ${idCompeticao}
        and tags.tag_id = ${idTag}`;

        const result = this.executeSQLCode(query);

        return result;
    }

    public cadastrarNovaTag(tagName : String, tagValue : String) {
        const query = `
        INSERT INTO tags (tag_name, tag_value)
        VALUES ('${tagName}','${tagValue}') RETURNING tag_id`;

        const result = this.executeSQLCode(query);

        return result;
    }

    public associarTagACompeticao(idCompeticao : String, idTag : String) {
        const query = `
        INSERT INTO contest_tags (contest_id, tag_id)
        VALUES (${idCompeticao}, (SELECT tag_id FROM tags WHERE tag_id = '${idTag}'))`;
        
        const result = this.executeSQLCode(query);
        
        return result;
    }

    public listarTag(idTag : String) {
        const query = `
        SELECT *
        FROM tags
        WHERE tags.tag_id = ${idTag}`;

        const result = this.executeSQLCode(query);

        return result;

    }

    public deletarTag(idTag : String) {
        const query =  `DELETE FROM tags
        WHERE tag_id = ${idTag}`;

        const result = this.executeSQLCode(query);

        return result;
    }

    public desvincularTag(idCompeticao : String, idTag : String){
        const query = `
        DELETE FROM contest_tags
        WHERE contest_id = ${idCompeticao}
        AND tag_id = ${idTag}`;

        const result = this.executeSQLCode(query);

        return result;
    }

    public atualizarTagVinculada(idCompeticao : String, idTag : String, tagName : String, tagValue : String) {
        const query = `
        UPDATE contest_tags
        SET tag_id = (SELECT tag_id FROM tags WHERE tag_name = '${tagName}' AND tag_value = '${tagValue}')
        WHERE contest_id = ${idCompeticao}
        AND tag_id = ${idTag}`;

        const result = this.executeSQLCode(query);

        return result;
    }

    public atualizarTag(idTag : String, tagName : String, tagValue : String) {
        const query = `
        UPDATE tags
        SET tag_name = '${tagName}', tag_value = '${tagValue}'
        WHERE tag_id = ${idTag}`;

        const result = this.executeSQLCode(query);

        return result;
    }

    public listarTagPorNome(tagName : String){
        const query = `
        SELECT *
        FROM tags
        WHERE tags.tag_name = '${tagName}'`;

        const result = this.executeSQLCode(query);

        return result;

    }
}

export default new TagDAO()