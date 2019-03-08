using System.Collections.Generic; 
using MongoDB.Bson;


namespace Visitor.Entity
{
  public class Configuration
  {  
      public IList<Country> Countries {get;set;}

      public IList<DropDownValue> PhotoIdTypes {get;set;} 

      public IList<DropDownValue> Departments {get;set;}

      public IList<DropDownValue> Roles {get;set;}

      public IList<DropDownValue> Locations {get;set;}

      public IList<Permission> Permissions {get;set;}

      public IList<DropDownValue> Employees{get;set;}
  }
}