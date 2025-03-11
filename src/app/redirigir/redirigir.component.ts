import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirigir',
  templateUrl: './redirigir.component.html',
  styleUrls: ['./redirigir.component.scss'],
  standalone: true,
})
export class RedirigirComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.location.href = ''; // Redirige a una URL en blanco
  }
}
