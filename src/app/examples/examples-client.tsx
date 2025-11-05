"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/ui/modal";
import {
  Settings,
  User,
  LogOut,
  HelpCircle,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  Search,
  Users,
  Activity,
} from "lucide-react";

export function ExamplesClient() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main
      id="main-content"
      className="flex min-h-screen w-full max-w-6xl mx-auto flex-col pt-32 pb-16 px-4 sm:px-8 md:px-16"
      role="main"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t("examples.title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          {t("examples.subtitle")}
        </p>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t("examples.description")}
        </p>
      </div>

      {/* UI Components Section */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("examples.sections.components.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("examples.sections.components.description")}
          </p>
        </div>

        <div className="space-y-6">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.button.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.button.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">
                  {t("examples.components.button.variants.default")}
                </Button>
                <Button variant="destructive">
                  {t("examples.components.button.variants.destructive")}
                </Button>
                <Button variant="outline">
                  {t("examples.components.button.variants.outline")}
                </Button>
                <Button variant="secondary">
                  {t("examples.components.button.variants.secondary")}
                </Button>
                <Button variant="ghost">
                  {t("examples.components.button.variants.ghost")}
                </Button>
                <Button variant="link">
                  {t("examples.components.button.variants.link")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.badge.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.badge.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">
                  {t("examples.components.badge.variants.default")}
                </Badge>
                <Badge variant="secondary">
                  {t("examples.components.badge.variants.secondary")}
                </Badge>
                <Badge variant="destructive">
                  {t("examples.components.badge.variants.destructive")}
                </Badge>
                <Badge variant="outline">
                  {t("examples.components.badge.variants.outline")}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.card.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.card.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("examples.components.card.exampleTitle")}
                  </CardTitle>
                  <CardDescription>
                    {t("examples.components.card.exampleContent")}
                  </CardDescription>
                </CardHeader>
              </Card>
            </CardContent>
          </Card>

          {/* Form Components */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.form.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.form.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-md">
                <Input
                  type="text"
                  placeholder={t("examples.components.form.placeholders.text")}
                />
                <Input
                  type="email"
                  placeholder={t("examples.components.form.placeholders.email")}
                />
                <Input
                  type="password"
                  placeholder={t(
                    "examples.components.form.placeholders.password"
                  )}
                />
                <Input
                  type="text"
                  placeholder={t(
                    "examples.components.form.placeholders.disabled"
                  )}
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          {/* Textarea */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.textarea.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.textarea.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t("examples.components.textarea.placeholder")}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Select */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.select.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.select.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {t("examples.components.select.options.option1")} ▼
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    {t("examples.components.select.options.option1")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("examples.components.select.options.option2")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("examples.components.select.options.option3")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Interactive Components */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t("examples.components.interactive.title")}
              </CardTitle>
              <CardDescription>
                {t("examples.components.interactive.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {t("examples.components.interactive.userMenu")}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {t("examples.components.interactive.myAccount")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      {t("examples.components.interactive.profile")}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      {t("examples.components.interactive.settings")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("examples.components.interactive.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("examples.components.interactive.description")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          {/* Alert Messages */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.alert.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.alert.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">
                        {t("examples.components.alert.success.title")}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                        {t("examples.components.alert.success.message")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-900 dark:text-red-100">
                        {t("examples.components.alert.error.title")}
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-300 mt-1">
                        {t("examples.components.alert.error.message")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-900 dark:text-yellow-100">
                        {t("examples.components.alert.warning.title")}
                      </div>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        {t("examples.components.alert.warning.message")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">
                        {t("examples.components.alert.info.title")}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        {t("examples.components.alert.info.message")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modal Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.modal.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.modal.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsModalOpen(true)}>
                {t("examples.components.modal.openModal")}
              </Button>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={t("examples.components.modal.modalTitle")}
              >
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("examples.components.modal.modalDescription")}
                  </p>
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      {t("examples.components.modal.cancel")}
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)}>
                      {t("examples.components.modal.confirm")}
                    </Button>
                  </div>
                </div>
              </Modal>
            </CardContent>
          </Card>

          {/* Separator */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.separator.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.separator.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>Content above</div>
                <Separator />
                <div>Content below</div>
                <Separator className="my-4" />
                <div>More content</div>
              </div>
            </CardContent>
          </Card>

          {/* Loading States */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.loading.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.loading.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-400" />
                  <span>{t("examples.components.loading.loading")}</span>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("examples.components.loading.pleaseWait")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Empty States */}
          <Card>
            <CardHeader>
              <CardTitle>{t("examples.components.emptyState.title")}</CardTitle>
              <CardDescription>
                {t("examples.components.emptyState.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("examples.components.emptyState.noResults")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t("examples.components.emptyState.description")}
                </p>
                <Button variant="outline" size="sm">
                  {t("examples.components.emptyState.action")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Layout Examples Section */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("examples.sections.layouts.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("examples.sections.layouts.description")}
          </p>
        </div>

        <div className="space-y-12">
          {/* Stats Cards */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("examples.layouts.dashboard.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="h-4 w-4 text-blue-500" />
                    {t("examples.layouts.dashboard.activeUsers")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-gray-500 mt-1">+12% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    {t("examples.layouts.totalUsers")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,345</div>
                  <p className="text-xs text-gray-500 mt-1">
                    +20.1% {t("examples.layouts.growthPercent")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Activity className="h-4 w-4 text-purple-500" />
                    {t("examples.layouts.dashboard.conversionRate")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-gray-500 mt-1">+0.5% this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    {t("examples.layouts.revenue")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,678</div>
                  <p className="text-xs text-gray-500 mt-1">
                    +12.5% {t("examples.layouts.growthPercent")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pricing Cards */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("examples.components.pricing.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("examples.components.pricing.basic.name")}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">
                      {t("examples.components.pricing.basic.price")}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {t("examples.components.pricing.basic.period")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {(() => {
                      const features = t(
                        "examples.components.pricing.basic.features"
                      );
                      return Array.isArray(features) ? features : [];
                    })().map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="border-purple-500 dark:border-purple-400">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {t("examples.components.pricing.pro.name")}
                    </CardTitle>
                    <Badge variant="secondary">Popular</Badge>
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">
                      {t("examples.components.pricing.pro.price")}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {t("examples.components.pricing.pro.period")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {(() => {
                      const features = t(
                        "examples.components.pricing.pro.features"
                      );
                      return Array.isArray(features) ? features : [];
                    })().map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
