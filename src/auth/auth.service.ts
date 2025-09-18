import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    private client  : any = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID
    )
    constructor(
private readonly  jwtService : JwtService,
private  readonly  userService : UserService,

){}
async validateGoogleIdToken(idToken: string): Promise<{email: string}>{
    try {
            const loginTicket  =  await  this.client.verifyIdToken({idToken, audience:process.env.GOOGLE_CLIENT_ID, });
            const payload = loginTicket.getPayload();
            if(!payload){
               throw new UnauthorizedException("Invalid login token");
            }
            return {
                email: payload?.email as string,
       
            }
    } catch (error) {
        console.log(error);
        throw new BadRequestException({message:'error validation   token '})
    }

}

async googleLogin (idToken:string): Promise<{accessToken: string}>{
    const userData = await this.validateGoogleIdToken(idToken);
    let user =  await this.userService.findByEmail(userData.email);
    if(!user){
user= await  this.userService.create(userData);

    }
    const payload:any = {userId: user.id , email:userData.email};
    return {
        accessToken: this.jwtService.sign(payload),
    }
}






}
