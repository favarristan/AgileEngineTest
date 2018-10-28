import { Component, OnInit } from '@angular/core';
import { TextService } from '../text-service/text.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  text = '';
  url: string;
  syn: Object;
  savedTerm: string;
  constructor(private textService: TextService, private http: HttpClient) {
    this.url  = 'https://api.datamuse.com/words?max=5&rel_syn=';
  }
  ngOnInit() {
    this.textService.getMockText().then((result) => this.text = result);
  }

  selecText() {
    var stext = "";
    if (window.getSelection) {
      stext = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      stext = document.selection.createRange().stext;
    }
    var range, sel;
    const n = stext.search(/^\s*\S+(?:\s+\S+){1,}\s*$/);
    if (n === -1 && stext !== '' && stext !== ' ') {
      this.searchSimilar(stext);
    }
  }

  saveSelection() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

  searchSimilar(term){
    this.savedTerm = this.saveSelection();
    this.http.get(this.url + term).subscribe(data => {
      this.syn = data;
    });
  }

  restoreSelection(range, replace) {
    if (range) {
      if (window.getSelection) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(replace)); 
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  }

  replaceWord (replace) {
    this.restoreSelection(this.savedTerm, replace);
  }
  
}
