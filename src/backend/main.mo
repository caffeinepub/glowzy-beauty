import List "mo:core/List";
import Text "mo:core/Text";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
  };

  let products = List.fromArray<Product>([
    {
      id = 1;
      name = "Radiant Facial Cleanser";
      description = "A gentle cleanser that removes impurities and leaves skin glowing.";
      price = 19.99;
      category = "Skincare";
      imageUrl = "https://example.com/images/cleanser.jpg";
    },
    {
      id = 2;
      name = "Hydrating Lip Balm";
      description = "Moisturizing lip balm for soft, smooth lips.";
      price = 9.99;
      category = "Lip Products";
      imageUrl = "https://example.com/images/lipbalm.jpg";
    },
    {
      id = 3;
      name = "Glowzy Foundation";
      description = "Lightweight foundation for a flawless finish.";
      price = 29.99;
      category = "Foundation";
      imageUrl = "https://example.com/images/foundation.jpg";
    },
    {
      id = 4;
      name = "Vitamin C Serum";
      description = "Brightening serum with vitamin C for radiant skin.";
      price = 24.99;
      category = "Skincare";
      imageUrl = "https://example.com/images/serum.jpg";
    },
  ]);

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filtered = products.filter(
      func(product) {
        product.category == category;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getProductById(id : Nat) : async ?Product {
    products.find(
      func(product) {
        product.id == id;
      }
    );
  };
};
