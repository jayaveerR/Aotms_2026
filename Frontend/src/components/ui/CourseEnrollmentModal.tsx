import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Sparkles, BookOpen, Smartphone, Mail, User } from "lucide-react";
import axios from 'axios';
import { toast } from 'sonner';

interface CourseEnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultCourse?: string;
    source?: string;
}

export const CourseEnrollmentModal = ({ isOpen, onClose, defaultCourse = "", source = "Website Lead" }: CourseEnrollmentModalProps) => {
    return null;
};
