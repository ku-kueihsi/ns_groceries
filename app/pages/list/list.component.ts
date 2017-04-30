import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";
import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";

@Component({
  providers: [GroceryListService],
  selector: "list",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  templateUrl: "pages/list/list.html",
})

export class ListComponent implements OnInit {
  // Data.
  groceryList: Grocery[] = [];
  grocery = "";
  isLoading = false;
  listLoaded = false;

  // Elements.
  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  // Functions.
  constructor(private groceryListService: GroceryListService) { }

  ngOnInit() {
    this.isLoading = true;
    this.listLoaded = false;
    this.groceryListService.load()
      .subscribe((loadedGroceries) => {
        loadedGroceries.forEach((groceryObject: any) => {
          this.groceryList.unshift(groceryObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }

    // Dismiss the keyboard
    const textField = this.groceryTextField.nativeElement as TextField;
    textField.dismissSoftInput();

    this.groceryListService.add(this.grocery)
      .subscribe(
      (groceryObject) => {
        this.groceryList.unshift(groceryObject);
        this.grocery = "";
      },
      () => {
        alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK",
        });
        this.grocery = "";
      },
      );
  }
}
