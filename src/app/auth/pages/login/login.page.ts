import { OverlayService } from './../../../core/services/overlay.service';
import { AuthProvider } from './../../../core/services/auth.types';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup; 
  AuthProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };

  private nameControl = new FormControl('',[Validators.required, Validators.minLength(3)])

  constructor(private authService:AuthService, private fb : FormBuilder, private overlayService: OverlayService, private navCtrl: NavController, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  private createForm(): void{
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })

  }


  get name(): FormControl{
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl{
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl{
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void{
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login':'Sign up';
    this.configs.actionChange = isSignIn ? 'Creat account' : 'Already have an account';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      :this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void>{
    const loading = await this.overlayService.loading();
    try{
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
     
      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect')||'/tasks')
      
    } catch (e){
      console.log('Auth error ', e);
      this.overlayService.toast({
        message: e.message
      });
    }finally{
      loading.dismiss();
    }

  }
}
