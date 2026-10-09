using Microsoft.ReactNative;
using Windows.ApplicationModel.Activation;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace OmDesktop
{
    sealed partial class App : ReactApplication
    {
        public App()
        {
            this.InitializeComponent();
            InstanceSettings.JavaScriptBundleFile = "index.windows";
            InstanceSettings.InstanceSettings.UseWebDebugger = false;
            InstanceSettings.InstanceSettings.UseFastRefresh = true;
        }

        protected override void OnLaunched(LaunchActivatedEventArgs e)
        {
            base.OnLaunched(e);
            var frame = Window.Current.Content as Frame;
            if (frame == null)
            {
                frame = new Frame();
                Window.Current.Content = frame;
            }

            string mainComponentName = "OmDesktop";
            frame.Navigate(typeof(MainPage), e.Arguments);
            Window.Current.Activate();
        }
    }
}
