import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { User } from '../authentication/user.model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  connectedUserSub: Subscription;
  connectedUser: User;
  constructor(private recipeService: RecipesService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const links = document.getElementsByTagName('li');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        const current = document.getElementsByClassName('active');
        if (current[0]) {
          current[0].className = current[0].className.replace('active', '');
          this.className += 'active';
        }
      });
    }

    this.connectedUserSub = this.authenticationService.connectedUser.subscribe(
      user => this.connectedUser = user
    );
  }

  saveData() {
    this.recipeService.saveRecipes(this.connectedUser);
  }

  fetchData() {
    this.recipeService.fetchRecipes(this.connectedUser).subscribe();
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.connectedUserSub.unsubscribe();
  }
}

