import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const selectElem = document.querySelectorAll('select');
    M.FormSelect.init(selectElem, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.init();
  }

  init() {
    this.jobForm = this.fb.group({
      company: ['', Validators.required],
      jobtitle: ['', Validators.required],
      location: ['', Validators.required],
      // industry: ['', [Validators.email, Validators.required]],
      description: ['', Validators.required],

    });
  }

  submitJob(jobForm) {
    console.log(this.jobForm);
  }

}
