﻿namespace Shopping.Domain.Configuration
{
    public class CorsConfiguration
    {
        public string[] AllowedOrigins { get; set; }
        public string[] AllowedMethods { get; set; }
        public string[] AllowedHeaders { get; set; }
    }
}
