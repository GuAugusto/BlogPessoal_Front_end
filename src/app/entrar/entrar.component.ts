import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService, //Injeção de dependencias
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      // Recebe os atributos do objeto userLogin na variavel global "environment"
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipo

      //Mostrando no console para verificar se realmente foi atribuido na variavel os atributos
      console.log(environment.token)
      console.log(environment.nome)

      //Redireciona para a pagina de inicio após realizar o Login
      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500){
        this.alertas.showAlertDanger('Usuario ou senha está incorreto!')
      }
    })
  }

}
