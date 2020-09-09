import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService implements OnInit {

  
  constructor() { }

  ngOnInit(){
    
  }

  playPing = () => {
    let audio = new Audio('assets/sound/ping.mp3');
    let p = audio.play().then(data => console.log(data));
    console.log(p);
  }
}
