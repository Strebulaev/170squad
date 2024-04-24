import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bronze-copper',
  templateUrl: './bronze-copper.component.html',
  styleUrls: ['./bronze-copper.component.css']
})
export class BronzeCopperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const blurredTextElement = document.getElementById("blurredText");

    if (blurredTextElement) {
      blurredTextElement.addEventListener("click", function () {
        this.style.filter = "none";
      });
    } else {
      console.error("Элемент с идентификатором 'blurredText' не найден.");
    }
  }
}
