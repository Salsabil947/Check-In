import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Edit, AlertCircle, Package } from 'lucide-react';

const inventoryData = [
  { 
    id: 'INV-001', 
    name: 'Bed Sheets (Queen)', 
    category: 'Linens',
    quantity: 250,
    minQuantity: 100,
    unit: 'pcs',
    supplier: 'Linen Plus Co.',
    lastRestocked: '2025-10-05'
  },
  { 
    id: 'INV-002', 
    name: 'Towels (Bath)', 
    category: 'Linens',
    quantity: 45,
    minQuantity: 80,
    unit: 'pcs',
    supplier: 'Linen Plus Co.',
    lastRestocked: '2025-09-20'
  },
  { 
    id: 'INV-003', 
    name: 'Shampoo Bottles', 
    category: 'Toiletries',
    quantity: 180,
    minQuantity: 100,
    unit: 'bottles',
    supplier: 'Beauty Essentials',
    lastRestocked: '2025-10-10'
  },
  { 
    id: 'INV-004', 
    name: 'Coffee Pods', 
    category: 'Food & Beverage',
    quantity: 520,
    minQuantity: 200,
    unit: 'boxes',
    supplier: 'Coffee House Suppliers',
    lastRestocked: '2025-10-12'
  },
  { 
    id: 'INV-005', 
    name: 'Cleaning Solution', 
    category: 'Cleaning',
    quantity: 85,
    minQuantity: 50,
    unit: 'gallons',
    supplier: 'Clean Pro Industries',
    lastRestocked: '2025-10-08'
  },
  { 
    id: 'INV-006', 
    name: 'Light Bulbs (LED)', 
    category: 'Maintenance',
    quantity: 25,
    minQuantity: 50,
    unit: 'boxes',
    supplier: 'Electric Supply Co.',
    lastRestocked: '2025-09-15'
  },
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (quantity: number, minQuantity: number) => {
    if (quantity <= minQuantity / 2) return { label: 'Critical', color: 'bg-red-100 text-red-700' };
    if (quantity <= minQuantity) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
  };

  const lowStockCount = inventoryData.filter(item => item.quantity <= item.minQuantity).length;
  const criticalStockCount = inventoryData.filter(item => item.quantity <= item.minQuantity / 2).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Inventory Management</h1>
          <p className="text-slate-500">Track and manage hotel inventory items</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6EC6CB] hover:bg-[#50b8bd]">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="Bed Sheets" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linens">Linens</SelectItem>
                    <SelectItem value="toiletries">Toiletries</SelectItem>
                    <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minQuantity">Min Quantity</Label>
                  <Input id="minQuantity" type="number" placeholder="50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" placeholder="pcs, boxes, gallons" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="Supplier Name" />
              </div>
              <Button className="w-full bg-[#6EC6CB] hover:bg-[#50b8bd]">Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Items</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">247</p>
            <p className="text-slate-500">In inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Low Stock Items</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              {lowStockCount}
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </p>
            <p className="text-slate-500">Needs restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Critical Stock</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              {criticalStockCount}
              <AlertCircle className="w-5 h-5 text-red-500" />
            </p>
            <p className="text-slate-500">Urgent reorder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Categories</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">12</p>
            <p className="text-slate-500">Item categories</p>
          </CardContent>
        </Card>
      </div>

      {(lowStockCount > 0 || criticalStockCount > 0) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-900">
                  {criticalStockCount > 0 && (
                    <span>{criticalStockCount} item(s) critically low. </span>
                  )}
                  {lowStockCount > 0 && (
                    <span>{lowStockCount} item(s) below minimum stock level.</span>
                  )}
                </p>
                <p className="text-yellow-700 mt-1">Please restock these items soon.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search inventory..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Linens">Linens</SelectItem>
                <SelectItem value="Toiletries">Toiletries</SelectItem>
                <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Min Quantity</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const status = getStockStatus(item.quantity, item.minQuantity);
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>
                      {item.minQuantity} {item.unit}
                    </TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      <Badge className={status.color}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Package className="w-4 h-4 mr-1" />
                          Restock
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
