import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { WindowRefService, ICustomWindow } from '../windowservice';
import { Router } from '@angular/router';
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
    public router:Router
   
  ){
    this._window = windowRef.nativeWindow;
    //this.create()
  }
  ngOnInit()
  {
    this.checkIdaNodes();
    this.checkUser();
    setTimeout(function(){
      this.backupAlert=false;
    })
  }


  checkIdaNodes()
  {
    var checkNodes=this._window.ScryptaCore.returnNodes();
    const app =this;
    for(var i =0;i<checkNodes.length;i++)
    {
      axios.get('https://'+checkNodes[i]+'/check')
      .then(function(response){
        app.nodes.push(response.data.name)
        if(i==checkNodes.length){
          app.connectToNode();
        }
      })
    }
  }
  connectToNode()
  {
    var app=this
    if(app.connected=='')
    {
      app.connected = app.nodes[Math.floor(Math.random()*app.nodes.length)];
          //app.checkBalance()
          //app.fetchTransactions()
    }
  }

  checkUser(){
    var app=this
    if(localStorage.getItem('wallet') !== null){
      let wallet = JSON.parse(localStorage.getItem('wallet'))
      if(wallet.count > 0 && wallet[0].pub !== undefined){
        app.router.navigate(['/dashboard'])
      }
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
          if(localStorage.getItem('wallet') === null){
            let wallet = [response.walletstore]
            localStorage.setItem('wallet',JSON.stringify(wallet))
          }else{
            let wallet = JSON.parse(localStorage.getItem('wallet'))
            wallet.push(response.walletstore)
            localStorage.setItem('wallet',JSON.stringify(wallet))
          }
          app.router.navigate(['/congratulations'])
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
