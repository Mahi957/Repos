export class Survey {
  Id: string;
  Name: string;
  IsPrivate: boolean;
  IsActive: boolean;

  constructor(Id: string, Name: string, IsPrivate: boolean, IsActive: boolean) {
    this.Id = Id;
    this.Name = Name;
    this.IsPrivate = IsPrivate;
    this.IsActive = IsActive;
  }
}
