import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() public hotelsTotal: number;
  @Input() public link: string;
  public currPage: number = 1;
  public perPageLimit: number = 3;
  public showPageRage: number;
  public pages: number[];
  public firstPage: number;
  public lastPage: number;
  public prevPage: number;
  public nextPage: number;

  public constructor(private dataService: DataService) {}

  public onPage($e: Event, pageNum: number): void {
    $e.preventDefault();
    this.dataService.setHttpParams({ _page: pageNum, _limit: this.perPageLimit });
    this.dataService.emitHotelsAction('getHotels', {});
    this.currPage = pageNum;
  }
  public onPrev(): void {
    this.dataService.setHttpParams({ _page: this.prevPage, _limit: this.perPageLimit });
    this.dataService.emitHotelsAction('getHotels', {});
    this.currPage = this.prevPage;
  }
  public onNext(): void {
    this.dataService.setHttpParams({ _page: this.nextPage, _limit: this.perPageLimit });
    this.dataService.emitHotelsAction('getHotels', {});
    this.currPage = this.nextPage;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { link } = changes;
    if (link === undefined) {
      return;
    }
    const currLink: string = link.currentValue;
    const prevLink: string = link.previousValue;
    if (currLink !== prevLink) {
      this.link = currLink;
      this.parseLink();
      this.generatePages();
    }
  }

  public generatePages(): void {
    const pages: number[] = Array.from({ length: this.showPageRage }).map((_, i) => {
      return 1 + i;
    });
    this.pages = pages;
  }

  // In the Link header you'll get first, prev, next and last links.
  private parseLink(): void {
    const stripOffSymbols = (str: string): string => {
      return str.replace(/<|>|;/g, '');
    };

    const pagesMap: {} = this.link
      .split(' ')
      .reduce((acc: {}, a: string, i: number, arr: string[]) => {
        if (arr[i + 1] === undefined) {
          return acc;
        }
        if (arr[i + 1].includes('first')) {
          acc['first'] = stripOffSymbols(a);
        }
        if (arr[i + 1].includes('prev')) {
          acc['prev'] = stripOffSymbols(a);
        }
        if (arr[i + 1].includes('next')) {
          acc['next'] = stripOffSymbols(a);
        }
        if (arr[i + 1].includes('last')) {
          acc['last'] = stripOffSymbols(a);
        }
        return acc;
      }, {});

    this.setPageValues(pagesMap);
  }

  private setPageValues(pagesMap: {}): void {
    const setPageNum = (key: string, url: string): void => {
      const pageNum: string = new URL(url).searchParams.get('_page');
      this[`${key}Page`] = parseInt(pageNum);
    };
    Object.keys(pagesMap).forEach(key => {
      setPageNum(key, pagesMap[key]);
    });
    if (pagesMap.hasOwnProperty('next') === false) {
      this.nextPage = undefined;
    }
    this.showPageRage = this.hotelsTotal / this.perPageLimit;
  }
}
