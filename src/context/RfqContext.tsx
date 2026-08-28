'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RfqItem, Product } from '@/types';

interface RfqContextType {
  items: RfqItem[];
  addItem: (product: Product, quantity?: number, packagingFormat?: string, requestSample?: boolean) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updatePackaging: (productId: string, packagingFormat: string) => void;
  toggleSample: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const RfqContext = createContext<RfqContextType | undefined>(undefined);

export function RfqProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RfqItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dbfine_rfq_items');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load RFQ cart from localStorage:', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('dbfine_rfq_items', JSON.stringify(items));
      } catch (e) {
        console.warn('Failed to save RFQ cart to localStorage:', e);
      }
    }
  }, [items, isInitialized]);

  const addItem = (
    product: Product,
    quantity = product.minOrderQty || 1,
    packagingFormat = product.packagingOptions[0] ? `${product.packagingOptions[0].size}${product.packagingOptions[0].unit} ${product.packagingOptions[0].type}` : 'Standard',
    requestSample = false
  ) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          casNumber: product.casNumber,
          grade: product.grade,
          purity: product.purity,
          packagingFormat,
          quantity,
          unit: product.unit,
          requestSample,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const updatePackaging = (productId: string, packagingFormat: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, packagingFormat } : item
      )
    );
  };

  const toggleSample = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, requestSample: !item.requestSample }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const itemCount = items.reduce((acc, item) => acc + (item.quantity > 0 ? 1 : 0), 0);

  return (
    <RfqContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updatePackaging,
        toggleSample,
        clearCart,
        itemCount,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </RfqContext.Provider>
  );
}

export function useRfq() {
  const context = useContext(RfqContext);
  if (!context) {
    throw new Error('useRfq must be used within an RfqProvider');
  }
  return context;
}
