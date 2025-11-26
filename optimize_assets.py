#!/usr/bin/env python3
"""
Image Optimization Script for Portfolio Website
================================================
Converts images to WebP format with smart resizing to improve PageSpeed scores.

INSTALLATION:
    pip install Pillow

USAGE:
    python optimize_assets.py

This script will:
1. Scan assets/img/ for all .jpg, .jpeg, .png files
2. Convert them to WebP format (quality=80)
3. Smart resize based on image type:
   - Logos/Icons: max-width 300px
   - Hero/Project images (>1200px wide): max-width 1200px
4. Save .webp files alongside originals (originals are preserved)
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow library not found.")
    print("Please install it with: pip install Pillow")
    sys.exit(1)


# Configuration
ASSETS_DIR = Path("assets/img")
WEBP_QUALITY = 80
LOGO_ICON_MAX_WIDTH = 300
HERO_PROJECT_MAX_WIDTH = 1200
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def is_logo_or_icon(filename: str) -> bool:
    """Check if filename suggests it's a logo or icon."""
    lower_name = filename.lower()
    return any(keyword in lower_name for keyword in ["logo", "icon", "favicon"])


def resize_image(img: Image.Image, max_width: int) -> Image.Image:
    """Resize image maintaining aspect ratio if wider than max_width."""
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        print(f"    ↳ Resized to {max_width}x{new_height}")
    return img


def convert_to_webp(image_path: Path) -> tuple[bool, str]:
    """
    Convert an image to WebP format with smart resizing.
    
    Returns:
        tuple: (success: bool, message: str)
    """
    try:
        # Open the image
        with Image.open(image_path) as img:
            original_size = f"{img.width}x{img.height}"
            
            # Convert to RGB if necessary (for PNG with transparency, use RGBA)
            if img.mode in ("RGBA", "LA", "P"):
                # Keep transparency for PNGs
                if img.mode == "P":
                    img = img.convert("RGBA")
            elif img.mode != "RGB":
                img = img.convert("RGB")
            
            filename = image_path.name
            
            # Smart resizing based on image type
            if is_logo_or_icon(filename):
                print(f"    ↳ Detected as logo/icon, max-width: {LOGO_ICON_MAX_WIDTH}px")
                img = resize_image(img, LOGO_ICON_MAX_WIDTH)
            elif img.width > HERO_PROJECT_MAX_WIDTH:
                print(f"    ↳ Large image detected, max-width: {HERO_PROJECT_MAX_WIDTH}px")
                img = resize_image(img, HERO_PROJECT_MAX_WIDTH)
            
            # Create output path with .webp extension
            output_path = image_path.with_suffix(".webp")
            
            # Save as WebP
            img.save(output_path, "WEBP", quality=WEBP_QUALITY, method=6)
            
            # Get file sizes for comparison
            original_size_kb = image_path.stat().st_size / 1024
            new_size_kb = output_path.stat().st_size / 1024
            savings = ((original_size_kb - new_size_kb) / original_size_kb) * 100
            
            return True, f"Saved {output_path.name} ({new_size_kb:.1f}KB, {savings:.1f}% smaller)"
            
    except Exception as e:
        return False, f"Error: {str(e)}"


def main():
    """Main function to process all images."""
    print("=" * 60)
    print("Portfolio Image Optimization Script")
    print("=" * 60)
    print(f"\nScanning: {ASSETS_DIR.absolute()}")
    print(f"WebP Quality: {WEBP_QUALITY}")
    print(f"Logo/Icon max-width: {LOGO_ICON_MAX_WIDTH}px")
    print(f"Hero/Project max-width: {HERO_PROJECT_MAX_WIDTH}px")
    print("-" * 60)
    
    if not ASSETS_DIR.exists():
        print(f"\nError: Directory '{ASSETS_DIR}' not found!")
        print("Make sure you're running this script from the project root.")
        sys.exit(1)
    
    # Find all images
    images = []
    for ext in IMAGE_EXTENSIONS:
        images.extend(ASSETS_DIR.rglob(f"*{ext}"))
        images.extend(ASSETS_DIR.rglob(f"*{ext.upper()}"))
    
    # Remove duplicates and sort
    images = sorted(set(images))
    
    if not images:
        print("\nNo images found to optimize.")
        return
    
    print(f"\nFound {len(images)} image(s) to process:\n")
    
    success_count = 0
    error_count = 0
    
    for image_path in images:
        print(f"Processing: {image_path.name}")
        success, message = convert_to_webp(image_path)
        
        if success:
            print(f"    ✓ {message}")
            success_count += 1
        else:
            print(f"    ✗ {message}")
            error_count += 1
        print()
    
    # Summary
    print("-" * 60)
    print("SUMMARY")
    print("-" * 60)
    print(f"✓ Successfully converted: {success_count}")
    print(f"✗ Errors: {error_count}")
    print(f"Original files: PRESERVED (not deleted)")
    print("\nNext steps:")
    print("1. Commit your changes")
    print("2. Deploy to see improved PageSpeed scores!")
    print("=" * 60)


if __name__ == "__main__":
    main()
