import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup;
  submitted = false;
  usuarios: Usuario[] = [];


  constructor(private router: Router, private fb: FormBuilder, private service: UsuarioService, public alerta: AlertController) {
    this.getUsuarios()
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      });
  }


 view(usuarios) {
  this.submitted = true;
}

getUsuarios() {
  const snapshotChanges = this.service.getSnapshotChanges();
  snapshotChanges.subscribe(resultQueryUsers => {
    resultQueryUsers.forEach(data => {
      this.usuarios.push({
        email: data.payload.doc.get('email'),
        password: data.payload.doc.get('password')
      });
    });
  });
}

usuarioEncontrado(email: string, password: string): {bol: boolean, usuario?: Usuario} {
  for (const u of this.usuarios) {
    if (u.email === email && u.password === password) {
      return {bol: true, usuario: u};
    }
  }
  return { bol: false };
}

iniciarSesion() {
  if (this.myForm.valid) {
    const existeEmail = this.usuarioEncontrado(this.myForm.get('email').value.toString(),
    this.myForm.get('password').value.toString());
    if (existeEmail.bol) {
      window.confirm('Usuario encontrado: entrando al sistema...');
      this.router.navigate(['tabs']);

    } else {
      window.confirm('Usuario y/o contraseña incorrecto/s, intentelo de nuevo...');
    }
  }
}
}