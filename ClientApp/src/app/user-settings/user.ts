export class User{
    name: string;
    nickname: string;
    picture: string;
    sub: string;
    updated_at: Date;

    constructor(name: string,  nickname:string, picture:string, sub:string, updated_at:Date){
        this.name = name;
        this.picture = picture;
        this.nickname = nickname;
        this.sub = sub;
        this.updated_at = updated_at;
    }
}