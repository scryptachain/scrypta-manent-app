import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { WindowRefService, ICustomWindow } from '../windowservice';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  password:string;
  repassword:string;
  nodes:string[]=[];
  backupAlert:boolean=true;
  add: string = '';
  connected:string="";
  encrypted_wallet: 'NO WALLET'; 
  unlockPwd: '';
  createPwd: '';
  createPwdRepeat: '';
  public_address: string;
  public_qrcode: '';
  address_balance: string='';
  explorer_url: '';
  passwordShow: false;
  importShow: false;
  decrypted_wallet: '';
  transactionMessage: string='Loading transactions...';

  noTransactions: boolean;
  currentPage: 1;
  countTransactions: 0;
  items: [];
  private _window: ICustomWindow;
  constructor(
    windowRef: WindowRefService,
    navCtrl:NavController,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ){
    this._window = windowRef.nativeWindow;
    //this.create()
  }

  ngOnInit()
  {
    this.add = this.activatedRoute.snapshot.paramMap.get('add')
    this.checkIdaNodes();
    this.checkUser();
    setTimeout(function(){
      this.backupAlert=false;
    })
  }

  checkIdaNodes() {
    var checknodes = this._window.ScryptaCore.returnNodes();
    const app = this
    for (var i = 0; i < checknodes.length; i++) {
      axios.get('https://' + checknodes[i] + '/check').then(function (response) {
        app.nodes.push(response.data.name)
        if (i == checknodes.length) {
          app.connectToNode()
        }
      })
    }
  }

  connectToNode() {
    var app = this
    if (app.connected == '') {
      app.connected = app.nodes[Math.floor(Math.random() * app.nodes.length)]
    }
  }

  checkUser(){
    var app=this
    if(localStorage.getItem('wallet') !== null){
      let wallet = JSON.parse(localStorage.getItem('wallet'))
      if(wallet.length > 0 && this.add === null){
        app.router.navigate(['/dashboard'])
      }else{
        document.getElementById('splash').style.display = 'none';
      }
    }else{
      document.getElementById('splash').style.display = 'none';
    }
  }

  async createWallet(){
    
    var app=this
    
    if(app.password!==''&& app.password==app.repassword)
    {
      await app._window.ScryptaCore.createAddress(app.password,false).then(async function(response){
        axios.post('https://'+app.connected+'/init',{
          address: response.pub,
          airdrop: true
        }).then(function(){
          app._window.ScryptaCore.readKey(app.password, response.walletstore).then(function (check) {
            if (check !== false) {
              if(localStorage.getItem('wallet') === null){
                let wallet = [response.walletstore]
                localStorage.setItem('wallet',JSON.stringify(wallet))
              }else{
                let wallet = JSON.parse(localStorage.getItem('wallet'))
                wallet.push(response.walletstore)
                localStorage.setItem('wallet',JSON.stringify(wallet))
              }
              app.router.navigate(['/congratulations'])
            }
          })
        }).catch((err)=>{
          console.log(err)
          alert("Seems there's a problem, please retry or change node!")
        });
      })

    }else{
      alert('Password is incorrect!')
    }
    
  }
  
}
