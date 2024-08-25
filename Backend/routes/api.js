import express from "express";
import { Router } from "express";

Router.get('/api/home', async (res) => {
    try {
      const announcements = await Anouncement.find();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving announcements', error });
    }
  });