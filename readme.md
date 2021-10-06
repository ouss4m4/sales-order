# Sales Order App

Work In Progress...

Web Application that allows for Sales department to create sales orders for registered clients.

In this app i will try an implements as much features as possible that i generally encounters in real world entreprise apps.

## Initial Architecture

```c#
public class Client
{
		[Key]
		public int CardCode { get; set; }

		[Required]
		public string CardName { get; set; }

		[Required]
		public string BillingAddress { get; set; }

		[Required]
		public string ShippingAddress { get; set; }
}
```

```c#
public class Item
{
		[Key]
		public int ItemCode { get; set; }

		[Required]
		public string ItemName { get; set; }

		[Required]
		public string description { get; set; }

		[Required]
		public int StockQty { get; set; }

		[Required]
		[Column(TypeName = "decimal(10,2)")]
		public decimal UnitPrice { get; set; }
}
```

```c#
public class Order
{
		[Key]
		public int OrderId { get; set; }

		public DateTime DocDate { get; set; }
		public DateTime DocDueDate { get; set; }

		[Required]
		public int CardCode { get; set; }

		[Required]
		public string CardName { get; set; }

		[Required]
		public string BillingAddress { get; set;
		}
		[Required]
		public string ShippingAddress { get; set; }

		[MinLength(1)]
		public ICollection<OrderLine> OrderLines { get; set; }
}
```

```c#
public class OrderLine
{
		[Key]
		public int LineId { get; set; }

		[Required]
		public int OrderId { get; set; }

		[Required]
		public int ItemCode { get; set; }

		[Required]
		public string ItemName { get; set; }

		[Required]
		public string description { get; set; }

		[Required]
		public int Quantity { get; set; }

}
```

## Backend

- DotNet Core Web Api :

  - initial data structure ✔
  - Data Inputs and Output (Models & Dtos) ✔
  - Controllers & Mappers ✔
  - Use repository pattern ✔
  - intial CRUD operation on all models ✔
  - substract stockqty on order creation ✔
  - Enhance Order creation
    - Add Order Total balance
    - Get orders per client
    - orders checkout state
    - tracking information
  - Role based authorization
    - limit client and items creation to admins
    - attribute order to connected salesperson

- Sql Server

![Db Diagram](https://raw.githubusercontent.com/ouss4m4/sales-order/main/db-diagram.png)

- Entity Framework architecture setup ✔
- start with InMemory db ✔
- move to SqlServer ✔

## FrontEnd

Todo: React app ...

## Devops

Docker & K8S deployment maybe ...
