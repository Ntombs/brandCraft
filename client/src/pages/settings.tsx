import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Shield, User, Bell, Lock } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    companyName: user?.companyName || "",
  });
  
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    projectUpdates: true,
    newMessages: true,
    marketingEmails: false,
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to the API
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would send to the API
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    setSecurity({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to the API
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated.",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-playfair text-3xl font-bold mb-6">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="profile" className="flex items-center justify-center">
              <User className="h-4 w-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center justify-center">
              <Lock className="h-4 w-4 mr-2" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      value={profile.companyName}
                      onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password"
                      value={security.currentPassword}
                      onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password"
                      value={security.newPassword}
                      onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                    Update Password
                  </Button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-lg mb-4">Two-Factor Authentication</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Enhance your account security</p>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account by enabling two-factor authentication
                      </p>
                    </div>
                    <Button variant="outline" className="ml-4">
                      <Shield className="h-4 w-4 mr-2" /> Setup 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when we contact you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNotificationUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Project Updates</p>
                        <p className="text-sm text-gray-500">
                          Receive notifications when your project status changes
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.projectUpdates}
                        onCheckedChange={(checked) => setNotifications({...notifications, projectUpdates: checked})}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">New Messages</p>
                        <p className="text-sm text-gray-500">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.newMessages}
                        onCheckedChange={(checked) => setNotifications({...notifications, newMessages: checked})}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-500">
                          Receive emails about new features and services
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => setNotifications({...notifications, marketingEmails: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                    Save Preferences
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
