const templateData = {
    "reportMonth": "يونيو",
    "reportYear": "2023",
    "totalStorageIns": 45,
    "totalStorageOuts": 312,
    "totalSales": 287,
    "totalProfit": 28750.50,
    "flourTypes": [
      {
        "name": "دقيق درجة أولى",
        "currentStock": 1250,
        "totalIn": 5000,
        "totalOut": 3750,
        "turnoverRate": 75,
        "packages": [
          {
            "packageNumber": 1001,
            "stock": 1000,
            "unitPurchasePrice": 7.50,
            "totalPurchasePrice": 7500.00,
            "createdAt": "2023-06-01",
            "supplier": "مطاحن مصر العليا"
          },
          {
            "packageNumber": 1002,
            "stock": 2000,
            "unitPurchasePrice": 7.30,
            "totalPurchasePrice": 14600.00,
            "createdAt": "2023-06-15",
            "supplier": "مطاحن شمال القاهرة"
          },
          {
            "packageNumber": 1003,
            "stock": 2000,
            "unitPurchasePrice": 7.40,
            "totalPurchasePrice": 14800.00,
            "createdAt": "2023-06-28",
            "supplier": "مطاحن وسط وغرب الدلتا"
          }
        ]
      },
      {
        "name": "دقيق درجة ثانية",
        "currentStock": 980,
        "totalIn": 4000,
        "totalOut": 3020,
        "turnoverRate": 75.5,
        "packages": [
          {
            "packageNumber": 2001,
            "stock": 1500,
            "unitPurchasePrice": 6.50,
            "totalPurchasePrice": 9750.00,
            "createdAt": "2023-06-03",
            "supplier": "مطاحن مصر الوسطى"
          },
          {
            "packageNumber": 2002,
            "stock": 2500,
            "unitPurchasePrice": 6.40,
            "totalPurchasePrice": 16000.00,
            "createdAt": "2023-06-20",
            "supplier": "مطاحن جنوب القاهرة"
          }
        ]
      },
      {
        "name": "دقيق درجة ثالثة",
        "currentStock": 1100,
        "totalIn": 3500,
        "totalOut": 2400,
        "turnoverRate": 68.57,
        "packages": [
          {
            "packageNumber": 3001,
            "stock": 1750,
            "unitPurchasePrice": 5.50,
            "totalPurchasePrice": 9625.00,
            "createdAt": "2023-06-05",
            "supplier": "مطاحن شرق الدلتا"
          },
          {
            "packageNumber": 3002,
            "stock": 1750,
            "unitPurchasePrice": 5.60,
            "totalPurchasePrice": 9800.00,
            "createdAt": "2023-06-22",
            "supplier": "مطاحن مصر العليا"
          }
        ]
      },
      {
        "name": "دقيق درجة رابعة",
        "currentStock": 850,
        "totalIn": 3000,
        "totalOut": 2150,
        "turnoverRate": 71.67,
        "packages": [
          {
            "packageNumber": 4001,
            "stock": 1500,
            "unitPurchasePrice": 4.50,
            "totalPurchasePrice": 6750.00,
            "createdAt": "2023-06-10",
            "supplier": "مطاحن الإسكندرية"
          },
          {
            "packageNumber": 4002,
            "stock": 1500,
            "unitPurchasePrice": 4.60,
            "totalPurchasePrice": 6900.00,
            "createdAt": "2023-06-25",
            "supplier": "مطاحن جنوب القاهرة"
          }
        ]
      }
    ],
    "storageOuts": [
      {
        "flourType": "دقيق درجة أولى",
        "quantity": 500,
        "clientPrice": 9.50,
        "totalClientCharge": 4750.00,
        "clientName": "مخبز الأصالة",
        "clientShopName": "الخبز الذهبي",
        "createdAt": "2023-06-05",
        "paymentMethod": "تحويل بنكي"
      },
      {
        "flourType": "دقيق درجة ثانية",
        "quantity": 750,
        "clientPrice": 8.50,
        "totalClientCharge": 6375.00,
        "clientName": "حلويات سارة",
        "clientShopName": "الحلو الطيب",
        "createdAt": "2023-06-08",
        "paymentMethod": "نقدي"
      },
      {
        "flourType": "دقيق درجة أولى",
        "quantity": 1000,
        "clientPrice": 9.30,
        "totalClientCharge": 9300.00,
        "clientName": "مخابز المدينة",
        "clientShopName": "خبز البلد",
        "createdAt": "2023-06-12",
        "paymentMethod": "شيك"
      },
      {
        "flourType": "دقيق درجة ثالثة",
        "quantity": 600,
        "clientPrice": 7.50,
        "totalClientCharge": 4500.00,
        "clientName": "مخبز العائلة",
        "clientShopName": "خبز على الطريقة البلدي",
        "createdAt": "2023-06-15",
        "paymentMethod": "تحويل بنكي"
      },
      {
        "flourType": "دقيق درجة رابعة",
        "quantity": 400,
        "clientPrice": 6.50,
        "totalClientCharge": 2600.00,
        "clientName": "مخبز الحي",
        "clientShopName": "الخبز الميسر",
        "createdAt": "2023-06-18",
        "paymentMethod": "نقدي"
      }
    ],
    "topClients": [
      {
        "name": "مخابز المدينة",
        "shopName": "خبز البلد",
        "totalPurchases": 15,
        "totalSpent": 127500.00,
        "preferredFlourType": "دقيق درجة أولى"
      },
      {
        "name": "مخبز الأصالة",
        "shopName": "الخبز الذهبي",
        "totalPurchases": 12,
        "totalSpent": 98000.00,
        "preferredFlourType": "دقيق درجة أولى"
      },
      {
        "name": "حلويات سارة",
        "shopName": "الحلو الطيب",
        "totalPurchases": 10,
        "totalSpent": 75000.00,
        "preferredFlourType": "دقيق درجة ثانية"
      },
      {
        "name": "مخبز العائلة",
        "shopName": "خبز على الطريقة البلدي",
        "totalPurchases": 8,
        "totalSpent": 56000.00,
        "preferredFlourType": "دقيق درجة ثالثة"
      },
      {
        "name": "مخبز الحي",
        "shopName": "الخبز الميسر",
        "totalPurchases": 6,
        "totalSpent": 39000.00,
        "preferredFlourType": "دقيق درجة رابعة"
      }
    ],
    "totalSalesAmount": 987500.00,
    "totalPaymentsReceived": 950000.00,
    "collectedDebts": 25000.00,
    "totalPurchaseCost": 650000.00,
    "operatingExpenses": 35000.00,
    "otherExpenses": 15000.00,
    "grossProfit": 337500.00,
    "netProfit": 287500.00,
    "profitMargin": 29.11,
    "returnOnInvestment": 35.25,
    "expectedSales": [
      {
        "flourType": "دقيق درجة أولى",
        "amount": 4000
      },
      {
        "flourType": "دقيق درجة ثانية",
        "amount": 3500
      },
      {
        "flourType": "دقيق درجة ثالثة",
        "amount": 2800
      },
      {
        "flourType": "دقيق درجة رابعة",
        "amount": 2200
      }
    ],
    "expectedRevenue": 1050000.00,
    "generatedDate": "2023-07-01"
  }

export default templateData