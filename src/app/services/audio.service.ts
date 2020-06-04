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
    audio.play();
  }
}
