import { Component, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  selectedText () {
    var text;
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }

  toItalic() {
    var text = "";
    var range, sel;
    const n = text.search(/^\s*\S+(?:\s+\S+){1,}\s*$/);
    text = this.selectedText();
    if (n === -1 && text !== '' && text !== ' ') {
      sel = window.getSelection();
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          var boldiv = document.createElement('i');
          boldiv.innerHTML = text;
          range.insertNode(boldiv);
      }
    }
  }

  toUnder() {
    var text = "";
    var range, sel;
    const n = text.search(/^\s*\S+(?:\s+\S+){1,}\s*$/);
    text = this.selectedText();
    if (n === -1 && text !== '' && text !== ' ') {
      sel = window.getSelection();
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          var boldiv = document.createElement('u');
          boldiv.innerHTML = text;
          range.insertNode(boldiv);
      }
    }
  }

  toBold() {
    var text = "";
    var range, sel;
    const n = text.search(/^\s*\S+(?:\s+\S+){1,}\s*$/);
    text = this.selectedText();
    if (n === -1 && text !== '' && text !== ' ') {
      sel = window.getSelection();
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          var boldiv = document.createElement('b');
          boldiv.innerHTML = text;
          range.insertNode(boldiv);
      }
    }
  }
}
