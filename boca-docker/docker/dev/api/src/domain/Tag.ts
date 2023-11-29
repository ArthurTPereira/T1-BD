export class Tag {
    private id? : number;
    private tagName : String;
    private tagValue : String;

    // Getter and Setter for id
    getId(): number | undefined {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    // Getter and Setter for tagName
    getTagName(): String {
        return this.tagName;
    }

    setTagName(tagName: String): void {
        this.tagName = tagName;
    }

    // Getter and Setter for tagValue
    getTagValue(): String {
        return this.tagValue;
    }

    setTagValue(tagValue: String): void {
        this.tagValue = tagValue;
    }


    // Constructor
    constructor(tagName: string, tagValue: string, id?: number) {
        this.tagName = tagName;
        this.tagValue = tagValue;
        this.id = id;
    }

    // Parse Json to Class instance
    static fromJson(json: any): Tag {
        const { id, tag_name, tag_value } = json;
        return new Tag(tag_name, tag_value, id);
    }

    static getTableName() : String{
        return "tags";
    }


   

}