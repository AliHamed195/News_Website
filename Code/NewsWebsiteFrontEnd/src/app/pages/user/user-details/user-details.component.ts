import { UsersService } from './../../../Services/Users/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailsViewModel } from '../../../models/user/user-details-view-model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  userId: string;
  userDetails!: UserDetailsViewModel;
  profileImageSafeUrl!: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private sanitizer: DomSanitizer
  ) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.usersService.getUserById(this.userId).subscribe((res: any) => {
      this.userDetails = res.data;
      this.profileImageSafeUrl = this.getSafeUrl(
        this.userDetails.profileImagePath
          ? JSON.parse(this.userDetails.profileImagePath)
          : ''
      );
    });
  }

  getSafeUrl(url: string): SafeUrl {
    return url && url !== ''
      ? this.sanitizer.bypassSecurityTrustUrl(url)
      : '../../../../assets/images/user-png-icon.png';
  }

  editUser(): void {
    this.router.navigate([`/Admin/users-edit/${this.userId}`]);
  }

  back(): void {
    this.router.navigate(['/Admin/users-all']);
  }
}
